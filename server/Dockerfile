# Use an official Go runtime as the base image
FROM golang:1.20.6-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download and install dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o main .

# Expose the port your application is running on
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
