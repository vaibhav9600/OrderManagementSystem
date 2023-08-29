package models

import "gorm.io/gorm"

type Invoices struct {
	ID        *uint `gorm:"primary_key;autoIncrement" json:"id"`
	BillAddID *uint `json:"billAdd_id"`
	ShipAddID *uint `json:"shipAdd_id"`
	PaymentID *uint `json:"payment_id"`
	OrderID   *uint `json:"order_id"`
}

func MigrateInvoices(db *gorm.DB) error {
	err := db.AutoMigrate(&Invoices{})
	return err
}
