package models

import "gorm.io/gorm"

type Orders struct {
	ID      *uint `gorm:"primary_key;autoIncrement" json:"id"`
	OrderID *uint `json:"order_id"`
}

func MigrateOrders(db *gorm.DB) error {
	err := db.AutoMigrate(&Orders{})
	return err
}
