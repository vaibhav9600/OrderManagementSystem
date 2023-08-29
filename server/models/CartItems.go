package models

import "gorm.io/gorm"

type CartItems struct {
	ID        *uint `gorm:"primary_key;autoIncrement" json:"id"`
	ProdID    *uint `json:"prod_id"`
	Quantity  *int  `json:"quantity"`
	InvoiceID *int  `json:"invoice_id"`
}

func MigrateCartItems(db *gorm.DB) error {
	err := db.AutoMigrate(&CartItems{})
	return err
}
