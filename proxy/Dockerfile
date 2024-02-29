# Use the official Rust image
FROM rust:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Cargo files
# COPY ./Cargo.toml ./Cargo.lock ./
COPY ./Cargo.toml ./

# Copy the source code
COPY ./src ./src

# Build the application
RUN cargo build --release

# Expose the port on which the application will listen
EXPOSE 3000

# Set the startup command
CMD ["target/release/proxy"]