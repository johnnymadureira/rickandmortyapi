terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


data "aws_ami" "latest" {
  most_recent      = true
  owners           = ["993580406930"]

  filter {
    name   = "name"
    values = ["import-ami-035f09d886b05721e"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_autoscaling_group" "asgr" {
  name_prefix       = "asgr"
  min_size   = 1
  max_size   = 3
  desired_capacity = 1
  availability_zones = ["us-east-1a"]

  launch_configuration = aws_launch_configuration.lc.id

  tag {
    key = "Name"
    value = "Autoescalonamento"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_autoscaling_policy" "policyscale"{
    name = "policyscale"
    autoscaling_group_name = aws_autoscaling_group.asgr.name
    policy_type = "TargetTrackingScaling"

    target_tracking_configuration {
      predefined_metric_specification {
        predefined_metric_type = "ASGAverageCPUUtilization"
        } 
      target_value      = 70
    }
}
resource "aws_launch_configuration" "lc" {
  name_prefix = "conf_lc"
  image_id = data.aws_ami.latest.id

  instance_type = "t2.micro"

  user_data = <<EOF
#!/bin/bash
echo "Atualizando pacotes..."
sudo apt update && sudo apt upgrade -y

echo "Instalando o Apache..."
sudo apt install apache2 -y

echo "Criando página de teste..."
echo "<h1>Hello, World!</h1>" | sudo tee /var/www/html/index.html

echo "Reiniciando o Apache..."
sudo systemctl restart apache2
EOF
}
