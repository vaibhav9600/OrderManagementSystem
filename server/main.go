package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"bitbucket.org/oms-vaibhav/a2/src/master/models"
	"bitbucket.org/oms-vaibhav/a2/src/master/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Product struct {
	Image         string `json:"image"`
	Image1        string `json:"image1"`
	Image2        string `json:"image2"`
	Image3        string `json:"image3"`
	Image4        string `json:"image4"`
	Image5        string `json:"image5"`
	Name          string `json:"name"`
	Brand         string `json:"brand"`
	Price         uint   `json:"price"`
	OriginalPrice uint   `json:"originalPrice"`
	IsOnSale      bool   `json:"isOnSale"`
	SKU           string `json:"sku"`
	Warranty      string `json:"warranty"`
	Details       string `json:"details"`
	ReturnPolicy  string `json:"returnPolicy"`
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateProduct(context *fiber.Ctx) error {
	product := Product{}

	err := context.BodyParser(&product)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = r.DB.Create(&product).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create product"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product has been added"})
	return nil
}

func (r *Repository) DeleteProduct(context *fiber.Ctx) error {
	productModel := models.Products{}
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := r.DB.Delete(productModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete product",
		})
		return err.Error
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product deleted successfully",
	})
	return nil
}

func (r *Repository) GetProducts(context *fiber.Ctx) error {
	productModels := &[]models.Products{}

	err := r.DB.Find(productModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get products"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "products data fetched successfully",
		"data":    productModels,
	})
	return nil
}

func (r *Repository) GetProductByID(context *fiber.Ctx) error {

	id := context.Params("id")
	productModel := &models.Products{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	fmt.Println("the ID is", id)

	err := r.DB.Where("id = ?", id).First(productModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get the book"})
		return err
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product id fetched successfully",
		"data":    productModel,
	})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/create_product", r.CreateProduct)
	api.Delete("/delete_product/:id", r.DeleteProduct)
	api.Get("/get_products/:id", r.GetProductByID)
	api.Get("/products", r.GetProducts)
	// api.Post("/create_order",r.CreateOrder)
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)

	if err != nil {
		log.Fatal("could not load the database")
	}

	err = models.MigrateProducts(db)
	if err != nil {
		log.Fatal("could not migrate db")
	}

	r := Repository{
		DB: db,
	}
	app := fiber.New()
	r.SetupRoutes(app)
	app.Listen(":8080")
}
