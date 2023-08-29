package models

import "gorm.io/gorm"

type PaymentMethods struct {
	ID   *uint   `gorm:"primary_key;autoIncrement" json:"id"`
	Type *string `json:"type"`
}

func MigratePaymentMethods(db *gorm.DB) error {
	err := db.AutoMigrate(&PaymentMethods{})
	return err
}
