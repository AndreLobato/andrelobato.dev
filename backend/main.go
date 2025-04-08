package main

import (
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type ContactForm struct {
	Name    string `json:"name" validate:"required,min=2,max=100"`
	Email   string `json:"email" validate:"required,email"`
	Message string `json:"message" validate:"required,min=10,max=1000"`
}

var validate = validator.New()

func handleContact(c *fiber.Ctx) error {
	// Check if body is empty
	if len(c.Body()) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Request body is empty",
		})
	}

	var form ContactForm
	if err := c.BodyParser(&form); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validate the struct
	if err := validate.Struct(form); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Validation failed",
			"details": err.Error(),
		})
	}

	// Here you can add logic to handle the form data (e.g., send email, store in database)
	log.Printf("Received contact form: %+v\n", form)

	return c.JSON(fiber.Map{
		"message": "Form submitted successfully",
	})
}

func main() {
	app := fiber.New(fiber.Config{
		AppName: "Andre Lobato Personal Website",
	})

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://www.andrelobato.dev, http://localhost:8080, http://localhost:3000",
		AllowMethods: "POST,OPTIONS",
		AllowHeaders: "Content-Type",
	}))

	// Routes
	app.Post("/contact", handleContact)

	// Start server
	log.Println("Server starting on :8080")
	log.Fatal(app.Listen(":8080"))
}
