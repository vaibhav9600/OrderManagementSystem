# InfraMarket Bootcamp Project - Order Management Service

This project is an **Order Management Service** built as part of the InfraMarket Bootcamp. It consists of a mobile application using **React Native** with **Redux** for state management, and a **Golang** backend to handle various order-related functionalities. The project also includes containerization using **Docker**, web server configuration with **NGINX**, and deployment orchestration with **Kubernetes**.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Product Management](#product-management)
  - [Shipping and Billing Management](#shipping-and-billing-management)
  - [Payment Management](#payment-management)
  - [Invoice and Cart Management](#invoice-and-cart-management)
- [Frontend (React Native)](#frontend-react-native)
- [Backend (Golang)](#backend-golang)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Docker and Kubernetes](#docker-and-kubernetes)
- [NGINX Configuration](#nginx-configuration)
- [How to Access](#how-to-access)
- [Conclusion](#conclusion)

## Project Overview

This project provides a system to manage product orders with support for the following:
- Creating, updating, and deleting products.
- Managing shipping and billing addresses.
- Managing payment methods.
- Generating invoices for orders.
- Handling cart operations in batch mode.
- Deploying the application via Docker, NGINX, and Kubernetes for network accessibility.

The system allows users to perform various order-related operations and is accessible by anyone on the same Wi-Fi network.

## Tech Stack

- **Frontend**: React Native, Redux
- **Backend**: Golang (Gin framework)
- **Database**: SQLite (or any configured database)
- **Containerization**: Docker
- **Web Server**: NGINX
- **Orchestration**: Kubernetes

## Features

1. **Product Management**:
   - Create, retrieve, and delete products.
  
2. **Shipping and Billing**:
   - Add and retrieve shipping and billing addresses.

3. **Payment Management**:
   - Add and retrieve payment methods.

4. **Invoice and Cart Management**:
   - Generate and view invoices.
   - Batch processing for cart items.

5. **Containerized Deployment**:
   - Docker configuration to containerize the application.
   - NGINX setup for reverse proxy.
   - Kubernetes setup for orchestration and scaling.

## API Endpoints

### Product Management

- **Create a Product**
  - **Endpoint**: `/api/create_product`
  - **Method**: `POST`
  - **Description**: Create a new product in the system.

- **Delete a Product**
  - **Endpoint**: `/api/delete_product/:id`
  - **Method**: `DELETE`
  - **Description**: Delete a product by its ID.

- **Get Product by ID**
  - **Endpoint**: `/api/get_products/:id`
  - **Method**: `GET`
  - **Description**: Retrieve details of a specific product by ID.

- **Get All Products**
  - **Endpoint**: `/api/products`
  - **Method**: `GET`
  - **Description**: Get a list of all products.

### Shipping and Billing Management

- **Create Shipping Address**
  - **Endpoint**: `/api/create_shipping`
  - **Method**: `POST`
  - **Description**: Add a new shipping address.

- **Get All Shipping Addresses**
  - **Endpoint**: `/api/shipping_addresses`
  - **Method**: `GET`
  - **Description**: Retrieve all shipping addresses.

- **Create Billing Address**
  - **Endpoint**: `/api/create_billing`
  - **Method**: `POST`
  - **Description**: Add a new billing address.

- **Get All Billing Addresses**
  - **Endpoint**: `/api/billing_addresses`
  - **Method**: `GET`
  - **Description**: Retrieve all billing addresses.

### Payment Management

- **Create Payment Method**
  - **Endpoint**: `/api/create_payment_method`
  - **Method**: `POST`
  - **Description**: Add a new payment method.

- **Get All Payment Methods**
  - **Endpoint**: `/api/payment_methods`
  - **Method**: `GET`
  - **Description**: Retrieve all available payment methods.

### Invoice and Cart Management

- **Create Invoice**
  - **Endpoint**: `/api/create_invoice`
  - **Method**: `POST`
  - **Description**: Generate an invoice for a given order.

- **Get Invoice by ID**
  - **Endpoint**: `/api/get_invoice_by_id/:invoice_id`
  - **Method**: `GET`
  - **Description**: Retrieve invoice details by invoice ID.

- **Create Cart Items in Batch**
  - **Endpoint**: `/api/create_cartItems_batch`
  - **Method**: `POST`
  - **Description**: Add cart items in bulk for batch processing.

## Frontend (React Native)

The frontend is a mobile app built using **React Native**. State management is handled via **Redux**, allowing smooth integration with the backend API for order, shipping, billing, and payment functionalities.

Key frontend features:
- **Product Page**: List and manage products.
- **Order Page**: View and generate invoices for orders.
- **Shipping/Billing Pages**: Manage addresses.
- **Cart and Checkout**: Handle bulk cart operations.

## Backend (Golang)

The backend is built using **Golang** and the **Gin** web framework. It handles business logic for managing products, orders, shipping, billing, and payments. It includes various API routes (listed above) to support order management services.

## Setup Instructions

### Backend Setup

1. Clone the repository.
2. Install Go and set up the environment.
3. Run the following command to install dependencies:
   ```bash
   go mod tidy
   ```
4. Run the backend server:
   ```bash
   go run main.go
   ```

### Frontend Setup

1. Clone the frontend repository.
2. Install React Native dependencies:
   ```bash
   npm install
   ```
3. Install iOS/Android dependencies (if necessary):
   ```bash
   npx pod-install
   ```
4. Run the app:
   ```bash
   npx react-native run-android  # for Android
   npx react-native run-ios      # for iOS
   ```

## Docker and Kubernetes

- **Docker**: The application is containerized using Docker for easy setup and scalability.
   - Dockerfile includes instructions to build both the backend and frontend containers.
   - You can build and run the containers using:
     ```bash
     docker-compose up --build
     ```
  
- **Kubernetes**: A Kubernetes setup is provided for orchestrating the containers. The setup ensures the application can scale and handle requests within a network.

## NGINX Configuration

NGINX is configured as a reverse proxy to route external requests to the internal services. It ensures that users on the same Wi-Fi network can access the system.

- Sample NGINX configuration:
  ```nginx
  server {
      listen 80;
      server_name your_server_ip;

      location /api/ {
          proxy_pass http://backend-service:8080;
          proxy_set_header Host $host;
      }

      location / {
          proxy_pass http://frontend-service:3000;
          proxy_set_header Host $host;
      }
  }
  ```

## How to Access

Once the project is set up using Docker and Kubernetes, anyone on the same Wi-Fi network can access the application using the server's IP address and the appropriate port.

- For example: `http://<server_ip>:80`

## Conclusion

This project demonstrates an order management system using React Native, Golang, Docker, NGINX, and Kubernetes. It provides comprehensive functionality for managing products, shipping, billing, payments, and invoices, while ensuring easy scalability and accessibility through containerized deployment.

