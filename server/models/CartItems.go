package models

import "gorm.io/gorm"

type CartItems struct {
	ID         *uint `gorm:"primary_key;autoIncrement" json:"id"`
	ProdID     *uint `json:"prod_id"`
	OrderID    *uint `json:"order_id"`
	Quantity   *int  `json:"quantity"`
}

func MigrateCartItems(db *gorm.DB) error {
	err := db.AutoMigrate(&CartItems{})
	return err
}
