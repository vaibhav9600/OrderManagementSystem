package models

import "gorm.io/gorm"

type Products struct {
	ID            *uint    `gorm:"primary_key;autoIncrement" json:"id"`
	Image         *string `json:"image"`
	Image1        *string `json:"image1"`
	Image2        *string `json:"image2"`
	Image3        *string `json:"image3"`
	Image4        *string `json:"image4"`
	Image5        *string `json:"image5"`
	Name          *string `json:"name"`
	Brand         *string `json:"brand"`
	Price         *uint   `json:"price"`
	OriginalPrice *uint   `json:"originalPrice"`
	IsOnSale      *bool   `json:"isOnSale"`
	SKU           *string `json:"sku"`
	Warranty      *string `json:"warranty"`
	Details       *string `json:"details"`
	ReturnPolicy  *string `json:"returnPolicy"`
}

func MigrateProducts(db *gorm.DB) error {
	err := db.AutoMigrate(&Products{})
	return err
}
