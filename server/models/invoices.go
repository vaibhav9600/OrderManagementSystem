package models

import "gorm.io/gorm"

type Invoices struct {
	ID        *uint `gorm:"primary_key;autoIncrement" json:"id"`
	BillAddID *uint `json:"bill_add_id"`
	ShipAddID *uint `json:"ship_add_id"`
	PaymentID *uint `json:"payment_id"`
}

func MigrateInvoices(db *gorm.DB) error {
	err := db.AutoMigrate(&Invoices{})
	return err
}
