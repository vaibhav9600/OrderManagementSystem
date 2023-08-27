package models

import "gorm.io/gorm"

type Products struct {
	ID            uint    `gorm:"primary key;autoIcrement" json:"id"`
	Name          *string `json:"name"`
	Brand         *string `json:"brand"`
	Price         *uint   `json:"price"`
	OriginalPrice *uint   `json:"originalPrice"`
	IsOnSale      *bool   `json:"isOnSale"`
	SKU           *string `json:"sku"`
	Warranty      *string `json:"warranty"`
	ReturnPolicy  *string `json:"returnPolicy"`
	Description   *string `json:"description"`
}

func MigrateProducts(db *gorm.DB) error {
	err := db.AutoMigrate(&Products{})
	return err
}
