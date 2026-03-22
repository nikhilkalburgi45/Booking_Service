# Airline Booking Service

A microservice for handling flight bookings in an airline management system. This service is part of a larger microservices architecture and handles all booking-related operations.

## 🚀 Features

- Create new flight bookings
- Update existing bookings
- Seat availability management
- Integration with Flight Service
- Error handling and validation
- RESTful API design

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (Sequelize ORM)
- Axios for HTTP requests
- Environment variables for configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Flight Service running (for flight data)

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
FLIGHT_SERVICE_PATH=http://localhost:4000
DB_NAME=airline_booking
DB_USERNAME=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
```

## 🗄️ Database Schema

### Bookings Table

```sql
CREATE TABLE Bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flightId INT NOT NULL,
    userId INT NOT NULL,
    status ENUM('InProcess', 'Booked', 'Cancelled') DEFAULT 'InProcess',
    noOfSeats INT NOT NULL DEFAULT 1,
    totalCost INT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3001/api/v1
```

### Create Booking
```http
POST /bookings
```

**Request Body:**
```json
{
    "flightId": 1,
    "userId": 1,
    "noOfSeats": 2
}
```

**Response:**
```json
{
    "message": "Booking created successfully",
    "success": true,
    "error": {},
    "data": {
        "id": 1,
        "flightId": 1,
        "userId": 1,
        "status": "Booked",
        "noOfSeats": 2,
        "totalCost": 2000,
        "createdAt": "2024-05-13T04:44:40.000Z",
        "updatedAt": "2024-05-13T04:44:41.107Z"
    }
}
```

### Update Booking
```http
PATCH /bookings/:id
```

**Request Body:**
```json
{
    "noOfSeats": 3,
    "status": "Confirmed"
}
```

**Response:**
```json
{
    "message": "Booking updated successfully",
    "success": true,
    "error": {},
    "data": {
        "id": 1,
        "flightId": 1,
        "userId": 1,
        "status": "Confirmed",
        "noOfSeats": 3,
        "totalCost": 3000,
        "createdAt": "2024-05-13T04:44:40.000Z",
        "updatedAt": "2024-05-13T04:44:41.107Z"
    }
}
```

## 🔄 Service Interactions

### Flight Service Integration
- The booking service communicates with the flight service to:
  - Get flight details (price, available seats)
  - Update seat availability after booking
  - Validate seat availability during updates

## 🏗️ Project Structure

```
src/
├── config/
│   └── serverConfig.js
├── controllers/
│   └── booking-controllers.js
├── models/
│   └── booking.js
├── repository/
│   └── booking-repository.js
├── routes/
│   ├── v1/
│   │   └── index.js
│   └── booking-routes.js
├── services/
│   └── booking-service.js
├── utils/
│   └── errors/
└── index.js
```

## 🚀 Getting Started

### Using Docker (Recommended)

1. Clone the repository
```bash
git clone https://github.com/nikhilkalburgi45/Booking_Service.git
cd BookingService
```

2. Build the Docker image
```bash
docker build -t booking-service .
```

3. Run the container
```bash
docker run -p 3001:3001 --env-file .env booking-service
```

### Local Development

1. Clone the repository
```bash
git clone https://github.com/nikhilkalburgi45/Booking_Service.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations
```bash
npx sequelize-cli db:migrate
```

5. Start the server
```bash
npm start
```

## 🧪 Error Handling

The service implements comprehensive error handling:

- **ValidationError**: For invalid input data
- **ServiceError**: For business logic errors
- **RepositoryError**: For database operation errors
- **AppError**: For general application errors

## 🔒 Security Considerations

- Input validation for all API endpoints
- Error messages don't expose internal details
- Environment variables for sensitive data
- Proper HTTP status codes for different scenarios

## 📝 API Response Format

All API responses follow a standard format:

```json
{
    "message": "Success/Error message",
    "success": true/false,
    "error": {},
    "data": {}
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Flight Service team for API integration
- All contributors who have helped shape this project