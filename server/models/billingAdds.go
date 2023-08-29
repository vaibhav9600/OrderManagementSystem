package models

import "gorm.io/gorm"

type BillingAdds struct {
	ID           *uint   `gorm:"primary_key;autoIncrement" json:"id"`
	AddressTitle *string `json:"addressTitle"`
	Address      *string `json:"address"`
	IsSelected   *bool   `json:"isSelected"`
}

func MigrateBillingAdds(db *gorm.DB) error {
	err := db.AutoMigrate(&BillingAdds{})
	return err
}
