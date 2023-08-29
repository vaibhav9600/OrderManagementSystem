package models

import "gorm.io/gorm"

type ShippingAdds struct {
	ID           *uint   `gorm:"primary_key;autoIncrement" json:"id"`
	AddressTitle *string `json:"addressTitle"`
	Address      *string `json:"address"`
	IsSelected   *bool   `json:"isSelected"`
}

func MigrateShippingAdds(db *gorm.DB) error {
	err := db.AutoMigrate(&ShippingAdds{})
	return err
}
