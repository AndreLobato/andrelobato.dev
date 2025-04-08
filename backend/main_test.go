package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func setupTestApp() *fiber.App {
	app := fiber.New(fiber.Config{
		AppName: "Andre Lobato Personal Website",
	})
	app.Post("/contact", handleContact)
	return app
}

func TestHandleContact(t *testing.T) {
	tests := []struct {
		name       string
		payload    interface{}
		wantStatus int
		wantError  bool
	}{
		{
			name: "valid contact form",
			payload: ContactForm{
				Name:    "John Doe",
				Email:   "john@example.com",
				Message: "Hello, this is a test message that is long enough",
			},
			wantStatus: fiber.StatusOK,
			wantError:  false,
		},
		{
			name: "invalid email format",
			payload: ContactForm{
				Name:    "John Doe",
				Email:   "invalid-email",
				Message: "Hello, this is a test message",
			},
			wantStatus: fiber.StatusBadRequest,
			wantError:  true,
		},
		{
			name: "short message",
			payload: ContactForm{
				Name:    "John Doe",
				Email:   "john@example.com",
				Message: "Hi",
			},
			wantStatus: fiber.StatusBadRequest,
			wantError:  true,
		},
		{
			name:       "empty payload",
			payload:    ContactForm{},
			wantStatus: fiber.StatusBadRequest,
			wantError:  true,
		},
		{
			name:       "nil payload",
			payload:    nil,
			wantStatus: fiber.StatusBadRequest,
			wantError:  true,
		},
	}

	app := setupTestApp()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var payload []byte
			var err error

			if tt.payload != nil {
				payload, err = json.Marshal(tt.payload)
				assert.NoError(t, err)
			}

			req := httptest.NewRequest("POST", "/contact", bytes.NewReader(payload))
			req.Header.Set("Content-Type", "application/json")

			resp, err := app.Test(req)
			assert.NoError(t, err)
			assert.Equal(t, tt.wantStatus, resp.StatusCode)

			body, err := io.ReadAll(resp.Body)
			assert.NoError(t, err)

			var result map[string]interface{}
			err = json.Unmarshal(body, &result)
			assert.NoError(t, err)

			if tt.wantError {
				assert.Contains(t, result, "error")
			} else {
				assert.Contains(t, result, "message")
				assert.Equal(t, "Form submitted successfully", result["message"])
			}
		})
	}
}
