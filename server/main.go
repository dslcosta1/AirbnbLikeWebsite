// Backend: Go (Gin)
// server/main.go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
    Type     string `json:"type"` // guest or host
}

type Booking struct {
    Guest      string `json:"guest"`
    PropertyID int    `json:"propertyId"`
    Date       string `json:"date"`
}

type Property struct {
    ID       int       `json:"id"`
    Host     string    `json:"host"`
    Name     string    `json:"name"`
    ImageUrl string    `json:"imageUrl"`
    Bookings []Booking `json:"bookings"`
}

var users []User
var properties = map[int]*Property{}
var propertyIDCounter = 1

func main() {
    r := gin.Default()

    r.POST("/register", func(c *gin.Context) {
        var user User
        if err := c.BindJSON(&user); err == nil {
            users = append(users, user)
            c.String(http.StatusOK, "User registered")
        } else {
            c.String(http.StatusBadRequest, "Invalid input")
        }
    })

    r.POST("/addProperty", func(c *gin.Context) {
        var property Property
        if err := c.BindJSON(&property); err == nil {
            property.ID = propertyIDCounter
            propertyIDCounter++
            property.Bookings = []Booking{}
            properties[property.ID] = &property
            c.String(http.StatusOK, "Property added")
        } else {
            c.String(http.StatusBadRequest, "Invalid input")
        }
    })

    r.GET("/properties", func(c *gin.Context) {
        result := []Property{}
        for _, p := range properties {
            result = append(result, *p)
        }
        c.JSON(http.StatusOK, result)
    })

    r.POST("/book", func(c *gin.Context) {
        var booking Booking
        if err := c.BindJSON(&booking); err == nil {
            if prop, ok := properties[booking.PropertyID]; ok {
                for _, b := range prop.Bookings {
                    if b.Date == booking.Date {
                        c.String(http.StatusConflict, "Already booked")
                        return
                    }
                }
                prop.Bookings = append(prop.Bookings, booking)
                c.String(http.StatusOK, "Property booked")
            } else {
                c.String(http.StatusNotFound, "Property not found")
            }
        } else {
            c.String(http.StatusBadRequest, "Invalid input")
        }
    })

    r.Run(":8080")
}
