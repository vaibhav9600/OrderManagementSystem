# Use an official Go runtime as the base image
FROM golang:1.20.6-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

RUN go install github.com/cosmtrek/air@latest
# Copy the Go module files
COPY go.mod go.sum ./

# Download and install dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

RUN go mod tidy
# Build the Go application
RUN go build -o main .

# Expose the port your application is running on
EXPOSE 5432

# Command to run the executable
CMD ["./main"]
