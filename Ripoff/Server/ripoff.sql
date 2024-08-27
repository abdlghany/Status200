-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 27, 2024 at 02:16 PM
-- Server version: 8.3.0
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ripoff`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `category_description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_image`, `category_description`) VALUES
(1, 'Electronics', './img/categories/electronics.png', 'Devices and gadgets'),
(2, 'Home Appliances', './img/categories/home_appliances.png', 'Appliances for home use'),
(3, 'Clothing', './img/categories/clothes.png', 'Men and women apparel'),
(4, 'Books', './img/categories/Books.png', 'Various genres of books'),
(5, 'Furniture', './img/categories/furniture.png', 'Household and office furniture'),
(6, 'Sports Equipment', './img/categories/sports_equipment.png', 'Gear and equipment for sports'),
(7, 'Toys', './img/categories/toys.png', 'Toys and games for children'),
(8, 'Beauty Products', './img/categories/beauty_products.png', 'Cosmetics and skincare'),
(9, 'Groceries', './img/categories/groceries.png', 'Fresh food and household items'),
(10, 'Accessories', './img/categories/accessories.png', 'Various accessories for all of your needs.');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `order_pdf` text,
  `payment_method` varchar(50) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `variation_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `variation_id` (`variation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_description` text,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Sold` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `category_id`, `created_at`, `Sold`, `is_active`) VALUES
(1, 'Asus Prime B450M-A II Motherboard, AM4 Socket, maATX, AMD Ryzen, DDR4 Memory, M.2, 6Gbps SATA, USB 3.1 Gen 2 Type-A, Aura Sync', 'Brand    ASUS\r\nCPU socket    Socket 1\r\nCompatible devices    CPU\r\nRAM memory technology    DDR\r\nCompatible processors    AMD Ryzen\r\nChipset type    AMD B450\r\nBellek Saat Hızı    4400 MHz\r\nPlatform    Windows 10\r\nModel name    Prime B450M-A II\r\nCPU model    6X86 ', 1, '2024-08-27 00:06:40', 0, 1),
(2, 'MSI MPG-B550 Motherboard', 'Brand    MSI\r\nCPU socket    Socket AM4\r\nCompatible devices    Personal Computer\r\nRAM memory technology    DDR4\r\nCompatible processors    https://msi.com/Motherboard/MPG-B550-GAMING-PLUS/Specification\r\nChipset type    AMD B550\r\nBellek Saat Hızı    4400 MHz\r\nPlatform    Windows 10\r\nModel name    MPG B550 Gaming Plus\r\nCPU model    AMD Ryzen 7', 1, '2024-08-27 00:07:35', 0, 1),
(3, 'Apple 2021 iPad (10,2\", Wi-Fi, 64 GB) - Space Grau (9. Generation)', 'Brand    Apple\r\nModel name    iPad\r\nMemory storage capacity    64 GB\r\nScreen Size    10.2\r\nOperating system    iOS 14\r\nColour    Space Grau\r\nRAM memory installed size    3 GB\r\nGeneration    9th Generation\r\nBattery life    10 Hours\r\nItem weight    487 Grams', 1, '2024-08-27 00:08:43', 0, 1),
(4, 'Apple 2020 iPad 10.2 (8. Gen) 32GB Wi-Fi - Space Grau (Generalüberholt)', 'Brand    Apple\r\nModel name    apple ipad\r\nMemory storage capacity    32 GB\r\nScreen Size    10.2 Inches\r\nOperating system    iOS 11\r\nColour    grau, grau space grey)\r\nRAM memory installed size    4 GB\r\nGeneration    8. Generation\r\nModel year    2020\r\nItem weight    490 Grams', 1, '2024-08-27 00:09:55', 0, 1),
(5, 'Acer EK271H Monitor 27 Inch (69 cm Screen) Full HD, 100Hz HDMI, 75Hz VGA, 5ms (GTG), HDMI 1.4, FreeSync, Black', 'Brand    Acer\r\nScreen Size    27 Inches\r\nResolution    FHD 1080p\r\nBeeldverhouding    16:9\r\nScreen surface description    Full HD\r\nImage contrast ratio    100 m: 1\r\nResponse time    1 Milliseconds\r\nRefresh rate    100 Hz\r\nDisplay resolution maximum    1920 x 1080 Pixels\r\nSpecial feature    Lightweight', 1, '2024-08-27 00:10:46', 0, 1),
(6, 'Samsung S31C Essential Monitor S27C314EAU 27 Inch IPS Panel Full HD Resolution Eco Saving Plus AMD FreeSync 5ms Response Time 75Hz Refresh Rate Black', 'Brand    Samsung\r\nScreen Size    27 Inches\r\nResolution    FHD 1080p\r\nBeeldverhouding    16:9\r\nScreen surface description    Matte\r\nImage contrast ratio    1000:1\r\nResponse time    5 Milliseconds\r\nRefresh rate    75 Hz\r\nDisplay resolution maximum    1920 x 1080 Pixels\r\nConnectivity technology    D-Sub, HDMI', 1, '2024-08-27 00:11:36', 0, 1),
(7, 'HP Pavilion All in One PC | 27 Inch IPS QHD Display | Intel Core i7-13700T | 16GB DDR4 RAM | 1TB SSD | Intel UHD Graphics 770 | QHD TNR 5MP IR Camera | Windows 11 Home | QWERTZ Keyboard | White', 'Brand    HP\r\nScreen Size    27 Inches\r\nResolution    QHD Wide 1440p\r\nBeeldverhouding    16:9\r\nRefresh rate    60 Hz\r\nDisplay resolution maximum    2560 x 1440 Pixels\r\nSpecial feature    [POSSIBLE_FEATURES] 1 TB SSD, QHD display, 5MP QHD privacy camera with pop-up function and TNR\r\nConnectivity technology    Ethernet\r\nDisplay type    LCD\r\nSpecific uses for product    Everyday Use', 1, '2024-08-27 00:12:21', 0, 1),
(8, 'Lenovo All in One ThinkCentre TIO24 Gen3 24 Inch Full HD Intel Core i5-7400T Display Port USB 3 16GB 512GB 24 Inch FullHD WebCam Windows 11 Pro (Refurbished)', 'Brand    Lenovo\r\nOperating system    Windows\r\nCPU model    Core i5\r\nCPU speed    2.4 GHz\r\nCache size    512 GB\r\nMemory storage capacity    512 GB\r\nSpecific uses for product    Business\r\nPersonal computer design type    All in One\r\nScreen Size    24 Inches\r\nRAM memory installed size    16 GB', 1, '2024-08-27 00:13:13', 0, 1),
(9, 'Apple iPhone 15 (128GB) - Black', 'Brand    Apple\r\nOperating system    iOS\r\nMemory storage capacity    128 GB\r\nScreen Size    6.1 Inches\r\nModel name    iPhone 15\r\nWireless carrier    Unlocked for All Carriers\r\nCellular technology    5G\r\nConnectivity technology    Bluetooth, Wi-Fi\r\nColour    black\r\nWireless network technology    Wi-Fi', 1, '2024-08-27 00:14:19', 0, 1),
(10, 'Apple iPhone 15 Pro (128GB) - Titanium Natural', 'Brand    Apple\r\nOperating system    iOS\r\nMemory storage capacity    128 GB\r\nScreen Size    6.1 Inches\r\nModel name    iPhone 15 Pro\r\nWireless carrier    Unlocked for All Carriers\r\nCellular technology    5G\r\nConnectivity technology    Bluetooth, Wi-Fi\r\nColour    Titanium natural\r\nWireless network technology    Wi-Fi', 1, '2024-08-27 00:15:03', 0, 1),
(11, 'OnePlus 12 5G 12GB RAM 256GB SIM-Free Smartphone with Hasselblad Camera for 4th Generation Smartphones - Silky Black', 'Brand    ONEPLUS\r\nOperating system    OxygenOS\r\nRAM memory installed size    12 GB\r\nCPU model    Snapdragon\r\nMemory storage capacity    256 GB\r\nScreen Size    12\r\nModel name    OnePlus 12 US\r\nWireless carrier    Unlocked for All Carriers\r\nCellular technology    5G\r\nConnectivity technology    Bluetooth, Wi-Fi, USB', 1, '2024-08-27 00:22:23', 0, 1),
(12, 'Xiaomi Redmi Note 13 Pro Smartphone, 5G, 8+256GB, 6.67 Inch Display, 1.5K 120Hz AMOLED Display, Snapdragon 7s, Ultra Clear 200MP Camera with OIS, 5100mAh, 67W Turbo Charging, Blue', 'Brand    Xiaomi\r\nOperating system    Android 13.0\r\nCPU model    Snapdragon\r\nCPU speed    1 Hz\r\nMemory storage capacity    8 GB\r\nScreen Size    6.67 Inches\r\nModel name    MZB0FFAEU\r\nWireless carrier    Unlocked\r\nCellular technology    5G\r\nConnectivity technology    Wi-Fi', 1, '2024-08-27 00:24:26', 0, 1),
(13, 'CHERRY JK-0800EU-2 KC 1000 USB US English w / Euro symbol black, one color', 'Brand    CHERRY\r\nCompatible devices    Laptop, Universal, PC, PC / Server\r\nConnectivity technology    RS-485\r\nKeyboard description    QWERTY\r\nRecommended uses for product    Multimedia, Gaming, Alltagsgebrauch, Persönlich, Business\r\nSpecial feature    PC / Mac, Keyboard\r\nColour    Schwarz\r\nNumber of keys    104\r\nKeyboard backlighting colour support    Single Color\r\nStyle    EU-Layout - QWERTY', 10, '2024-08-27 00:25:30', 0, 1),
(14, 'Logitech K120 Business Wired Keyboard for Windows and Linux, USB port, Silent Touch, rugged, splash-proof, keyboard stand, UK QWERTY layout - Black', 'Brand    Logitech\r\nCompatible devices    PC\r\nConnectivity technology    USB\r\nKeyboard description    Englisch (QWERTY)\r\nRecommended uses for product    Büro, Gaming\r\nSpecial feature    PC/Mac^Tastatur\r\nColour    Schwarz\r\nNumber of keys    104\r\nKeyboard backlighting colour support    Single Color\r\nStyle    UK LAYOUT', 10, '2024-08-27 00:27:22', 78, 0),
(15, 'Logitech M185 wireless mouse, 2.4 GHz connection via nano USB receiver, 1000 DPI optical sensor, 12-month battery life, for left and right-handed users, PC / Mac - gray, English packaging', 'Brand    Logitech\r\nColour    gray\r\nConnectivity technology    Wi-Fi, USB\r\nSpecial feature    Wireless\r\nMovement detection technology  No', 10, '2024-08-27 00:29:36', 0, 1),
(16, 'Amazon Basics Ergonomische kabellose USB Maus - DPI einstellbar - Schwarz\r\n', 'Brand    Amazon Basics\r\nColour    black\r\nConnectivity technology    2.4 GHz wireless\r\nSpecial feature    Wireless\r\nMovement detection technology    Optical', 10, '2024-08-27 00:30:08', 70, 0),
(17, 'NEW\'C Pack of 3 Tempered Glass Screen Protector for iPhone 15/15 Pro (6.1 Inches), Scratch Free, 9H Hardness, HD Screen Protector, 0.33 mm Ultra Clear, Ultra Resistant\r\n', 'Brand    NEW\'C\r\nCompatible devices    iPhone 15 Pro (6.1 inches), iPhone 15 (6.1 inches)\r\nMaterial    Glass\r\nItem hardness    9H\r\nProduct dimensions    14.4L x 6.8W centimetres\r\nCompatible phone models    iPhone 15 Pro (6.1 inches), iPhone 15 (6.1 inches)\r\nSpecial feature    Scratch-resistant\r\nFinish type    Glossy\r\nUnit count    3.0 stück\r\nScreen Size    6.1 Inches', 10, '2024-08-27 00:30:40', 0, 1),
(18, 'Rcokas For Protection OnePlus 12 Tempered Glass Screen Protector OnePlus 12 Screen Protector [Pack of 2] [HD Screen Protector] [Soft TPU], for OnePlus 12 5G Screen Protector [Ultra Clear] [Scratch]', 'Brand    Rcokas\r\nProduct dimensions    15L x 7W centimetres\r\nManufacturer    Rcokas', 10, '2024-08-27 00:31:34', 0, 1),
(19, 'JBL Flip 6 Bluetooth box in grey: waterproof portable speaker with 2-way speaker system for powerful sound – up to 12 hours of wireless music play', 'Brand    JBL\r\nSpeaker maximum output power    30 Watts\r\nConnectivity technology    Bluetooth, USB\r\nAudio output mode    Stereo\r\nMounting type    Tabletop Mount\r\nModel name    JBL Flip 6\r\nSpeaker type    Monitor\r\nSpecial feature    For music\r\nRecommended uses for product    For music players\r\nCompatible devices    Smartphone', 10, '2024-08-27 00:31:58', 0, 1),
(20, 'JBL Wave 200TWS True Wireless In-Ear Bluetooth Headphones in Black, with Built-in Microphone, Music Streaming up to 20 Hours, Includes Charging Case', 'Brand    JBL\r\nColour    black\r\nEar placement    In Ear\r\nForm factor    In Ear\r\nNoise control    Active Noise Cancellation\r\nFrequency response    20 KHz\r\nHeadphone jack    USB\r\nModel name    JBL W200TWSBLK\r\nConnectivity technology    Wireless\r\nWireless communication technology    Bluetooth', 10, '2024-08-27 00:32:18', 0, 1),
(21, 'DICTAC Bed 140 x 200 cm with LED Lighting, Bed Frame 140 x 200 cm with Metal Slatted Frame, Adult Floating Bed Frame with Light, Robust and Stable, Easy to Assemble, Black (without Mattress)', 'Size    140x200cm\r\nProduct dimensions    2L x 1.4W x 0.2H metres\r\nSpecial feature    No Box Spring Needed, Floating design, Squeak Resistant, Metal slatted frame, With LED lighting, Squeakproof, No box spring requiredNo Box Spring Needed, Floating design, Squeak Resistant, Metal slatted frame, With LED lighting, Squeakproof, No box spring required\r\nColour    Black\r\nIncluded components    Installation Manual, Bed frame, slatted frame, Easy installation tools, bed frame, Slat, Installation instructions (English language not guaranteed)Installation Manual, Bed frame, slatted frame, Easy installation tools, bed frame, Slat, Installation instructions (English language not guaranteed)\r\n', 5, '2024-08-27 00:33:01', 0, 1),
(22, 'BASE Timeless wardrobe in three different sizes - Versatile swing door wardrobe in white - 120 x 177 x 52 cm (W / H / D)', 'Brand    Stella Trading\r\nColour    White\r\nRecommended uses for product    Shoes\r\nProduct dimensions    52D x 120W x 177H centimetres\r\nSpecial feature    revolving doors', 5, '2024-08-27 00:33:35', 0, 1),
(23, 'Koonmi Bogen Full Length Mirror, 44 x 147 cm, Curved Standing Mirror, Large Full Length, Wall Mounted, Leaning, Floor Mirror, Full Body as Dressing Vanity Mirror for Living Room, Black', 'Brand    Koonmi\r\nRoom type    Living Room\r\nShape    Rectangular\r\nProduct dimensions    147L x 44W centimetres\r\nFrame material    Aluminium', 5, '2024-08-27 00:34:02', 0, 1),
(24, 'JUMMICO Gaming Table 130 x 130 x 75 cm, Desk with Monitor Stand, Corner Desk, L Shape, Gaming Desk L-Shaped, Large PC Corner Table, Black', 'Brand    JUMMICO\r\nProduct dimensions    130D x 130W x 75H centimetres\r\nColour    Black\r\nStyle    Modern\r\nBase material    Engineered Wood\r\nSpecial feature    Scratch Resistant\r\nRoom type    Office\r\nRecommended uses for product    Intensive computer use, especially for gaming, due to its ergonomic and stable design\r\nMounting type    Freestanding\r\nFurniture leg material    Engineered Wood', 5, '2024-08-27 00:34:32', 0, 1),
(25, 'Newfurn Dining Table Wild Oak Dining Room Table Kitchen Table Dining Table II 120 x 76.5 x 70 cm (W x H x D) Extendible up to 160 cm including 40 cm Table Top Anthracite Kitchen Table Dining Table', 'Brand    Newfurn\r\nProduct dimensions    70D x 160W x 75H centimetres\r\nColour    Anthracite / Wild Oak\r\nShape    Rectangular\r\nTable design    Dining Table', 5, '2024-08-27 00:35:05', 0, 1),
(26, 'DEULINE® SGS 521247 Dining Room Chairs Solid Wood Upholstered Chair Oslo White', 'Brand    DEULINE\r\nColour    White\r\nProduct dimensions    55D x 48W x 83H centimetres\r\nSize    1 Stück\r\nBack style    Solid Back', 5, '2024-08-27 00:35:32', 0, 1),
(27, 'Dowinx Gaming Chair, Racing Gamer Chair, Ergonomic Gaming Chair with Lumbar Support, Gaming Chair, PU Leather, PC Chair, Widened Backrest, 150 kg, Black', 'Brand    Dowinx\r\nColour    Black\r\nProduct dimensions    50D x 54.5W x 129.6H centimetres\r\nBack style    Wing Back\r\nSpecial feature    Ergonomic', 5, '2024-08-27 00:35:59', 0, 1),
(28, 'NONGSHIM - Instant Nudeln Shin Ramyun - Multipack (20 X 120 GR) ', 'Nutrition summary\r\nPer 100\r\n1776kJ    13g    6.1g    3g    3.8g\r\nEnergy    Fat    Saturates    Sugars    Salt', 9, '2024-08-27 00:36:29', 0, 1),
(29, 'Olitalia 9444 Extra Virgin Olive Oil, First Grade Bottle, Pack of 1 (1 x 500 ml)', 'Brand    Olitalia\r\nFlavour    Olive oil\r\nNet content volume    16.91 Fluid Ounces, 500 Millilitres\r\nSpecial feature    unraffiniert\r\nSıvı Hacmi    500 Millilitres\r\nItem package quantity    1\r\nContainer material    Glass\r\nItem form    Konserviert', 9, '2024-08-27 00:37:00', 0, 1),
(30, 'Feinkost Dittmann Green Olives without Stone (1 x 140 g)', 'Prices for items sold by Amazon include VAT. Depending on your delivery address, VAT may vary at Checkout. For other items, please see details.\r\nBrand    Feinkost Dittmann\r\nSpecial feature    ohne Stein\r\nTheme    Letters\r\nRecommended uses for product    Vorspeise, mediterran, Salat, Grillen\r\nSpecific uses for product    Kaltgetränke', 9, '2024-08-27 00:37:30', 0, 1),
(31, 'Gut & Günstig H-Milk 1.5 Percent, Pack of 12 (12 x 1 L)', 'Brand    H-O\r\nFlavour    Milk\r\nAllergen information    Contains: Milk\r\nItem form    Liquid\r\nUnit count    12000.0 milliliter\r\nNumber of items    1\r\nPackage information    Tumblers\r\nSpecialty    Ohne Konservierungsstoffe\r\n', 9, '2024-08-27 00:38:06', 0, 1),
(32, 'Adelholzener Classic, pack of 18, disposable (18 x 500 ml)', 'Brand    Adelholzener\r\nVariety    Mineral\r\nPackage information    Plastic Bottle\r\nItem volume    500 Millilitres\r\nUnit count    9000.0 milliliter\r\nNumber of items    18\r\nSpecialty    Vegetarian, Alcohol-free, Low Sodium\r\nPackage weight    9.7 Kilograms', 9, '2024-08-27 00:38:30', 0, 1),
(33, 'Tuna Pieces in Sunflower Oil 145g (Pack of 1)', 'Brand    Amazon\r\nItem weight    0.15 Kilograms\r\nSpecialty    High protein content\r\nItem form    Stick\r\nPackage weight    0.17 Kilograms', 9, '2024-08-27 00:39:18', 0, 1),
(34, 'Beko BBIM12300X Built-in Oven, LED Display, 8 Cooking Functions, Robust Door, H x W x D: 59.5 x 59.4 x 56.7 cm / 72 litres. [Energy Class A]', 'Size    72 Liter Garraumvolumen\r\nBrand    Beko\r\nColour    Stainlesssteel\r\nHeating method    Conduction\r\nFinish type    Polished', 2, '2024-08-27 00:39:41', 0, 1),
(35, 'Gorenje fridge-freezer combination [Energy Class E]', 'Product dimensions    55.7D x 55W x 180H centimetres\r\nBrand    Gorenje\r\nCapacity    264 litres\r\nConfiguration    269l\r\nEnergy star    4 Star\r\nColour    Stainlesssteel\r\nSpecial feature    Adjustable Shelves\r\nInstallation type    Freestanding\r\nNumber of doors    2\r\nDefrost system    Automatic', 2, '2024-08-27 00:40:23', 0, 1),
(36, 'Philips FC9332 / 09 Boughless vacuum cleaner PowerPro Compact (900 W, 1.5 liters dust volume, integrated brush) white', 'Brand    Philips\r\nSpecial feature    Wireless, combination accessory nozzle, bagless vacuum cleaner, floor vacuum cleaner, allergy friendlyWireless, combination accessory nozzle, bagless vacuum cleaner, floor vacuum cleaner, allergy friendly\r\nFilter type    Cartridge\r\nIncluded components    Philips FC9332/09 PowerPro Compact Bagless Vacuum Cleaner, 900 W, Black/White\r\nIs cordless?    No', 2, '2024-08-27 00:40:46', 0, 1),
(37, 'SEVERIN MW 7886 Microwave Solo, Microwave for Defrosting and Heating, Microwave with Turntable for Even Heat Distribution, Black', 'Brand    SEVERIN\r\nProduct dimensions    36D x 45W x 24H centimetres\r\nColour    Black\r\nCapacity    1 load\r\nSpecial feature    For defrosting and heating with turntable\r\nRecommended uses for product    Defrosting and heating food\r\nInstallation type    Over-the-Range\r\nWattage    700\r\nIncluded components    Installation hardware\r\nController type    Semi-automatic', 2, '2024-08-27 00:41:12', 0, 1),
(38, 'ArtSport Set of 2 Dumbbells 20/30/40 kg –Dumbbell Set with 2 Dumbbells, Weights and 4 Spinlock Collars', 'Brand    ArtSport\r\nColour    black\r\nItem weight    20 Kilograms\r\nMaterial    Plastic\r\nSpecial feature    Non-Slip', 6, '2024-08-27 00:41:45', 0, 1),
(39, 'flintronic Fitness Gloves, Breathable Training Gloves with Microfibre Fabric, Non-Slip Silicone Gym Gloves, Weightlifting Gloves, Sports Gloves for Men and Women (Improved Style)', 'Brand    flintronic\r\nMaterial    Silicone\r\nSize    M/L\r\nSport    Exercise and Fitness\r\nGlove type    Sports gloves\r\nAge range (description)    Adult\r\nColour    #1 Black-M\r\nSpecial feature    Slip Resistant, Flexible, Lightweight\r\nHand orientation    Ambidextrous\r\nItem package quantity    1\r\n', 6, '2024-08-27 00:42:04', 130, 0),
(40, 'Ultrasport F-Bike, Bicycle Trainer, Exercise Bike, Folding Home Trainer, LCD Display, Opt. Hand Pulse Sensors, Adjustable Resistance Levels, Easy Assembly, Ideal for Athletes and Seniors', 'Brand    Ultrasport\r\nSpecial feature    Calories Monitor, Speed Monitor, Distance Travelled Monitor, Foldable\r\nColour    Black/silver\r\nPower source    Battery Powered\r\nRecommended uses for product    Indoor\r\nItem weight    15.5 Kilograms\r\nMaterial    Stainless Steel\r\nResistance mechanism    Magnetic\r\nProduct dimensions    87D x 43.5W x 118H centimetres\r\nMaximum weight recommendation    110 Kilograms', 6, '2024-08-27 00:42:32', 0, 1),
(41, 'YOLEO Folding Weight Bench Multifunctional Training Fitness Bench Abdominal Trainer Slanted Bench with 6-Way Adjustable Backrest/3-Way Adjustable Seat Cushion, Load 250 kg, Sit Up Bench', 'Brand    YOLEO\r\nItem weight    10.5 Kilograms\r\nMaterial    Alloy Steel\r\nColour    black\r\nProduct dimensions    110D x 43W x 114.3H centimetres\r\nFrame material    Alloy Steel\r\nWeight limit    300 Kilograms\r\nManufacturer    YOLEO', 6, '2024-08-27 00:42:57', 0, 1),
(42, 'Oball Rattle – Flexible and Easy-to-Grip Design for Children of All Ages Classic', 'Brand    Bright Starts\r\nMaterial    Plastic\r\nColour    Blue, green, red, yellow\r\nAge range (description)    baby, toddler\r\nItem weight    0.02 Kilograms', 7, '2024-08-27 00:43:27', 0, 1),
(43, 'FPVERA Pram Toy for Babies Activity Spiral Toy Hanging Toy Baby Seat Cot Toy Baby Spiral Plush Toy for Toddlers Boys Girls from 0 3 6 9 12 Months', 'colourful animal shape design, and a BB cry is built into the top of the animal, which creates a soft and sweet sound when pressed, which can not only attract the baby\'s attention, but also train the baby\'s hearing. At the same time, accessories are hung on each ring that can train the baby\'s gripping ability\r\nSafe and soft spiral crib toy: hanging stroller toys are made of soft and safe fabric material, non-toxic, BPA free, no fluorescent additives, no irritation to baby\'s skin, safety for baby\r\nWidely Used The spiral plush toy is especially suitable for entertainment at home or on the go. Can be placed in different places, stroller, car seat, cot, travel or other places to use\r\nParent-child interaction: baby crib accessories are not only cute decoration for cribs and cradles, but also valuable sensory toys or photography props for babies, which are very suitable for interacting with babies. It can be hung on the cradle so that the baby can play alone and you have time to do some of your own things', 7, '2024-08-27 00:44:14', 0, 1),
(44, 'Fisher-Price FPM50 Stuffed Toy Puppies with Songs and Sets Growing Play Levels Baby Toy from 6 Months', 'Age: 6 Months +\r\nEncourages these development areas: Curiosity and amazement, Early Childhood Learning, Communicative Skills\r\nThe child\'s best friend guarantees endless learning fun by responding to touch with great singing and phrases that familiarise with over 100 simple words, body parts, colours, shapes and more\r\nAnd because every child develops at its own pace, the cuddly soft puppy features Smart Stages technology so parents can choose the level that is good for their child.\r\nEach of the three levels holds a series of songs, sounds and phrases\r\nAnd by the way, the vocabulary of the little one expands in a playful way.\r\n', 7, '2024-08-27 00:44:51', 0, 1),
(45, 'Baby Teething Toy, Baby Remote Control Teething Ring, Silicone Teething Aid Baby BPA-Free with Baby Dummy Chain, Silicone, Teething Nursing Accessories for 3+ Months Baby (Black)', 'Material    Silicone\r\nColour    black\r\nBrand    Svalor\r\nMaterial Type Free    Kunststofffrei\r\nItem dimensions L x W x H    22 x 8.5 x 1.5 centimetres', 7, '2024-08-27 00:45:23', 0, 1),
(46, 'Maybelline New York Feuchtigkeitsspendender Lippenstift mit pflegenden Ölen, Cremige Textur mit Collagen und Jojoba-Öl, Moisture Extreme, Nr. 132 Metallic Mauve (Violett), 1 x 5g', 'Brand    MAYBELLINE\r\nItem form    Pencil\r\nFinish type    Glossy\r\nSun protection    15 SPF\r\nSkin type    Dry\r\nColour    Metallic Mauve\r\nProduct benefits    Combines glamorous colour with intensive care\r\nFlavour    jade\r\nMaterial feature    Natural\r\nNumber of items    1\r\n', 8, '2024-08-27 00:45:52', 0, 1),
(47, 'Essence cosmetics liquid ink eyeliner waterproof, Eye Liner, Nr. 01, schwarz, definierend, langanhaltend, wasserfest, vegan, ohne Parfüm (3ml)', 'Colour    black\r\nBrand    essence cosmetics\r\nItem form    Gel\r\nFinish type    Matte\r\nSpecial feature    Waterproof, Oil-free\r\nProduct benefits    Defining\r\nMaterial Type Free    Oil-free\r\nNumber of items    1\r\nUnit count    1 stück\r\nCoverage    Full', 8, '2024-08-27 00:46:18', 0, 1),
(48, 'Maybelline New York Mascara for Volume and Definition, Lash Sensational, Very Black, 9.5 ml', 'Colour    Black (very black)\r\nProduct benefits    With the innovative 2-in-1 eyelash defalter brush, a long, dense and full eyelash fan is created in 2 easy stepsWith the innovative 2-in-1 eyelash defalter brush, a long, dense and full eyelash fan is created in 2 easy steps\r\nBrand    MAYBELLINE\r\nSpecialty    Tested, lightweight, without\r\nNumber of items    1\r\nUnit count    9.5 milliliter\r\nItem volume    9.5 Millilitres\r\nSkin type    Normal\r\nWater resistance level    Waterproof\r\nCoverage    Lightweight', 8, '2024-08-27 00:47:15', 0, 1),
(49, 'Colour-Changing Liquid Foundation, SPF 15 Full Day Flawless Concealer Foundation Make-Up, Moisturising Long Lasting Makeup Hold Foundation, Adaptation Nude, Lightweight', 'Item form    Cream\r\nColour    Natural\r\nSkin type    All\r\nFinish type    Natural\r\nPackage information    Bottle\r\nBrand    EONFAVE\r\nCoverage    Medium\r\nProduct benefits    Moisturizing\r\nSkin tone    Light, medium, medium to dark\r\nSun protection    15 SPF', 8, '2024-08-27 00:47:46', 535, 0),
(50, 'Fruit of the Loom Men\'s T-Shirt, Heavy Cotton, M, L, XL, XXL, 3XL, Various Colour Sets, Pack of 5', 'Product details\r\nMaterial composition100% Cotton\r\nCare instructionsMachine Wash\r\nClosure typePull On\r\nNeck styleRound Neck', 3, '2024-08-27 00:48:29', 0, 1),
(51, 'Damyuan Shoes Men\'s Trainers Running Shoes Sports Shoes Trainers Hiking Shoes Men\'s Tennis Shoes Outdoor Fitness Shoes', 'Product details\r\nSole materialEthylene Vinyl Acetate\r\nOuter materialSynthetic\r\nInner materialMesh\r\nClosure typeLace-Up', 3, '2024-08-27 00:48:46', 0, 1),
(52, 'LVCBL Men\'s Linen Shorts, Lightweight, Airy Summer Shorts, Plain, Loose Fit, Casual Shorts', 'Material composition75% Cotton, 25% Linen\r\nCare instructionsMaschinenwäsche bei kaltem Wasser, niedrige Temperatur zum Trocknen oder Lufttrocknen. Bügeln bei Bedarf, am besten noch feucht.\r\nClosure typeDrawstring\r\nRise styleMid Rise', 3, '2024-08-27 00:49:48', 0, 1),
(53, 'Levi\'s Men\'s Long-Sleeved Original Housemark Tee T-Shirt', 'Material composition100% Cotton\r\nCare instructionsMachine Wash\r\nNeck styleRound Neck\r\nSleeve typeLong Sleeve', 3, '2024-08-27 00:50:16', 0, 1),
(54, 'Surrounded by Idiots : The Four Types of Human Behaviour By Thomas Erikson', 'Do you ever think you\'re the only one making any sense? Or tried to reason with your partner with disastrous results? Do long, rambling answers drive you crazy? Or does your colleague\'s abrasive manner get your back up?\r\n\r\n\r\nYou are not alone. After a disastrous meeting with a highly successful entrepreneur, who was genuinely convinced he was \'surrounded by idiots\', communication expert and bestselling author, Thomas Erikson dedicated himself to understanding how people function and why we often struggle to connect with certain types of people.\r\n\r\n\r\nOriginally published in Swedish in 2014 as Omgiven Av Idioter, Erikson\'s Surrounded by Idiots is already an international phenomenon, selling over 1.5 million copies worldwide, of which over 750,000 copies have been sold in Sweden alone. It offers a simple, yet ground-breaking method for assessing the personalities of people we communicate with - in and out of the office - based on four personality types (Red, Blue, Green and Yellow), and provides insights into how we can adjust the way(s) we speak and share information.\r\n\r\n\r\nErikson will help you understand yourself better, hone communication and social skills, handle conflict with confidence, improve dynamics with your boss and team, and get the best out of the people you deal with and manage. He also shares simple tricks on body language, improving written communication and advice on when to back away or when to push on, and when to speak up or indeed shut up. Packed with \'aha!\' and \'oh no!\' moments, Surrounded by Idiots will help you understand and influence those around you, even people you currently think are beyond all comprehension.\r\n\r\n\r\nAnd with a bit of luck you can also be confident that the idiot out there isn\'t you!', 4, '2024-08-27 00:52:57', 0, 1),
(55, 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear', 'Tiny Changes, Remarkable Results\r\n\r\n\r\nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.\r\n\r\n\r\nIf you\'re having trouble changing your habits, the problem isn\'t you. The problem is your system. Bad habits repeat themselves again and again not because you don\'t want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you\'ll get a proven system that can take you to new heights.\r\n\r\n\r\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.\r\n\r\n\r\nLearn how to:\r\n\r\nmake time for new habits (even when life gets crazy);\r\n\r\novercome a lack of motivation and willpower;\r\n\r\ndesign your environment to make success easier;\r\n\r\nget back on track when you fall off course;\r\n\r\n...and much more.\r\n\r\n\r\nAtomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.', 4, '2024-08-27 00:53:36', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
CREATE TABLE IF NOT EXISTS `products_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_location` varchar(255) NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products_images`
--

INSERT INTO `products_images` (`image_id`, `image_location`, `product_id`) VALUES
(1, './img/products/1/1.png', 1),
(2, './img/products/1/2.png', 1),
(3, './img/products/1/3.png', 1),
(4, './img/products/2/1.png', 2),
(5, './img/products/2/2.png', 2),
(6, './img/products/2/3.png', 2),
(7, './img/products/3/1.png', 3),
(8, './img/products/3/2.png', 3),
(9, './img/products/3/3.png', 3),
(10, './img/products/4/1.png', 4),
(11, './img/products/4/2.png', 4),
(12, './img/products/4/3.png', 4),
(13, './img/products/5/1.png', 5),
(14, './img/products/5/2.png', 5),
(15, './img/products/5/3.png', 5),
(16, './img/products/6/1.png', 6),
(17, './img/products/6/2.png', 6),
(18, './img/products/6/3.png', 6),
(19, './img/products/7/1.png', 7),
(20, './img/products/7/2.png', 7),
(21, './img/products/7/3.png', 7),
(22, './img/products/8/1.png', 8),
(23, './img/products/8/2.png', 8),
(24, './img/products/8/3.png', 8),
(25, './img/products/9/1.png', 9),
(26, './img/products/9/2.png', 9),
(27, './img/products/9/3.png', 9),
(28, './img/products/10/1.png', 10),
(29, './img/products/10/2.png', 10),
(30, './img/products/10/3.png', 10),
(31, './img/products/10/4.png', 10),
(32, './img/products/10/5.png', 10),
(33, './img/products/10/6.png', 10),
(34, './img/products/10/7.png', 10),
(35, './img/products/10/8.png', 10),
(36, './img/products/10/9.png', 10),
(37, './img/products/11/1.png', 11),
(38, './img/products/11/2.png', 11),
(39, './img/products/11/3.png', 11),
(40, './img/products/12/1.png', 12),
(41, './img/products/12/2.png', 12),
(42, './img/products/12/3.png', 12),
(43, './img/products/13/1.png', 13),
(44, './img/products/13/2.png', 13),
(45, './img/products/13/3.png', 13),
(46, './img/products/14/1.png', 14),
(47, './img/products/14/2.png', 14),
(48, './img/products/14/3.png', 14),
(49, './img/products/15/1.png', 15),
(50, './img/products/15/2.png', 15),
(51, './img/products/15/3.png', 15),
(52, './img/products/16/1.png', 16),
(53, './img/products/16/2.png', 16),
(54, './img/products/16/3.png', 16),
(55, './img/products/17/1.png', 17),
(56, './img/products/17/2.png', 17),
(57, './img/products/17/3.png', 17),
(58, './img/products/18/1.png', 18),
(59, './img/products/19/1.png', 19),
(60, './img/products/20/1.png', 20),
(61, './img/products/20/2.png', 20),
(62, './img/products/20/3.png', 20),
(63, './img/products/21/1.png', 21),
(64, './img/products/21/2.png', 21),
(65, './img/products/21/3.png', 21),
(66, './img/products/22/1.png', 22),
(67, './img/products/22/2.png', 22),
(68, './img/products/22/3.png', 22),
(69, './img/products/23/1.png', 23),
(70, './img/products/23/2.png', 23),
(71, './img/products/23/3.png', 23),
(72, './img/products/24/1.png', 24),
(73, './img/products/24/2.png', 24),
(74, './img/products/24/3.png', 24),
(75, './img/products/25/1.png', 25),
(76, './img/products/25/2.png', 25),
(77, './img/products/25/3.png', 25),
(78, './img/products/26/1.png', 26),
(79, './img/products/26/2.png', 26),
(80, './img/products/26/3.png', 26),
(81, './img/products/27/1.png', 27),
(82, './img/products/27/2.png', 27),
(83, './img/products/28/1.png', 28),
(84, './img/products/28/2.png', 28),
(85, './img/products/28/3.png', 28),
(86, './img/products/29/1.png', 29),
(87, './img/products/29/2.png', 29),
(88, './img/products/29/3.png', 29),
(89, './img/products/30/1.png', 30),
(90, './img/products/30/2.png', 30),
(91, './img/products/30/3.png', 30),
(92, './img/products/31/1.png', 31),
(93, './img/products/32/1.png', 32),
(94, './img/products/32/2.png', 32),
(95, './img/products/32/3.png', 32),
(96, './img/products/33/1.png', 33),
(97, './img/products/34/1.png', 34),
(98, './img/products/34/2.png', 34),
(99, './img/products/34/3.png', 34),
(100, './img/products/35/1.png', 35),
(101, './img/products/35/2.png', 35),
(102, './img/products/35/3.png', 35),
(103, './img/products/36/1.png', 36),
(104, './img/products/36/2.png', 36),
(105, './img/products/37/1.png', 37),
(106, './img/products/37/2.png', 37),
(107, './img/products/37/3.png', 37),
(108, './img/products/38/1.png', 38),
(109, './img/products/39/1.png', 39),
(110, './img/products/39/2.png', 39),
(111, './img/products/39/3.png', 39),
(112, './img/products/40/1.png', 40),
(113, './img/products/40/2.png', 40),
(114, './img/products/41/1.png', 41),
(115, './img/products/41/2.png', 41),
(116, './img/products/42/1.png', 42),
(117, './img/products/42/2.png', 42),
(118, './img/products/43/1.png', 43),
(119, './img/products/43/2.png', 43),
(120, './img/products/43/3.png', 43),
(121, './img/products/44/1.png', 44),
(122, './img/products/44/2.png', 44),
(123, './img/products/44/3.png', 44),
(124, './img/products/45/1.png', 45),
(125, './img/products/45/2.png', 45),
(126, './img/products/45/3.png', 45),
(127, './img/products/46/1.png', 46),
(128, './img/products/46/2.png', 46),
(129, './img/products/47/1.png', 47),
(130, './img/products/47/2.png', 47),
(131, './img/products/47/3.png', 47),
(132, './img/products/48/1.png', 48),
(133, './img/products/48/2.png', 48),
(134, './img/products/48/3.png', 48),
(135, './img/products/49/1.png', 49),
(136, './img/products/49/2.png', 49),
(137, './img/products/49/3.png', 49),
(138, './img/products/50/1.png', 50),
(139, './img/products/51/1.png', 51),
(140, './img/products/51/2.png', 51),
(141, './img/products/51/3.png', 51),
(142, './img/products/52/1.png', 52),
(143, './img/products/52/2.png', 52),
(144, './img/products/52/3.png', 52),
(145, './img/products/53/1.png', 53),
(146, './img/products/53/2.png', 53),
(147, './img/products/53/3.png', 53),
(148, './img/products/54/1.jpeg', 54),
(149, './img/products/54/2.jpeg', 54),
(150, './img/products/54/3.jpeg', 54),
(151, './img/products/54/4.jpeg', 54),
(152, './img/products/54/5.jpeg', 54),
(153, './img/products/54/6.jpeg', 54),
(154, './img/products/55/1.jpeg', 55),
(155, './img/products/55/2.jpeg', 55),
(156, './img/products/55/3.jpeg', 55),
(157, './img/products/55/4.jpeg', 55),
(158, './img/products/55/5.jpeg', 55),
(159, './img/products/55/6.jpeg', 55);

-- --------------------------------------------------------

--
-- Table structure for table `products_variations`
--

DROP TABLE IF EXISTS `products_variations`;
CREATE TABLE IF NOT EXISTS `products_variations` (
  `variation_id` int NOT NULL AUTO_INCREMENT,
  `variation_price` decimal(10,2) NOT NULL,
  `variation_stock` int DEFAULT '0',
  `variation_name` varchar(50) NOT NULL,
  `product_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`variation_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products_variations`
--

INSERT INTO `products_variations` (`variation_id`, `variation_price`, `variation_stock`, `variation_name`, `product_id`, `is_active`) VALUES
(1, 399.99, 15, 'Black', 1, 1),
(2, 399.99, 10, 'White', 1, 1),
(3, 450.00, 15, 'Wi-Fi', 2, 1),
(4, 399.99, 10, 'No Wi-Fi', 2, 1),
(5, 1599.99, 10, 'Gray', 3, 1),
(6, 2520.00, 15, 'Gray', 4, 1),
(7, 2500.00, 5, 'White', 4, 1),
(8, 499.99, 150, 'Black', 5, 1),
(9, 550.00, 15, 'Black', 6, 1),
(10, 550.00, 25, 'White', 6, 1),
(11, 3550.00, 10, 'White', 7, 1),
(12, 3600.00, 17, 'Black', 8, 1),
(13, 3200.00, 15, 'Black', 9, 1),
(14, 3200.00, 27, 'White', 9, 1),
(15, 3200.00, 0, 'Lime Green', 9, 0),
(16, 3200.00, 0, 'Pink', 9, 0),
(17, 3200.00, 30, 'Yellow', 9, 1),
(18, 2999.99, 55, 'Black', 10, 1),
(19, 2999.99, 60, 'White', 10, 1),
(20, 2799.99, 85, 'Black', 11, 1),
(21, 1250.00, 156, 'Sky Blue', 12, 1),
(22, 150.00, 250, 'Black', 13, 1),
(23, 195.50, 0, 'Black', 14, 0),
(24, 85.00, 36, 'Black', 15, 1),
(25, 85.00, 25, 'White', 15, 1),
(26, 110.00, 0, 'Black', 16, 0),
(27, 14.99, 350, 'Tempered Glass', 17, 1),
(28, 12.99, 150, 'Tempered Glass', 18, 1),
(29, 75.50, 50, 'Gray', 19, 1),
(30, 180.00, 65, 'Black', 20, 1),
(31, 1500.00, 35, 'Size King', 21, 1),
(32, 1200.00, 40, 'Size Queen', 21, 1),
(33, 1150.00, 45, 'height 177cm', 22, 1),
(34, 1350.00, 65, 'height 200cm', 22, 1),
(35, 85.00, 70, 'Black Frame', 23, 1),
(36, 650.00, 85, 'Black', 24, 1),
(37, 750.00, 35, 'Black + Assembly', 24, 1),
(38, 550.00, 65, 'Black Base', 25, 1),
(39, 550.00, 0, 'Gray Base', 25, 0),
(40, 35.00, 357, 'White', 26, 1),
(41, 750.00, 97, 'Black', 27, 1),
(42, 35.00, 100, '120g x 20', 28, 1),
(43, 30.00, 100, '500ml', 29, 1),
(44, 16.00, 100, '250ml', 29, 1),
(45, 21.00, 100, '140g', 30, 1),
(46, 40.00, 100, '300g', 30, 1),
(47, 4.50, 150, '1L', 31, 1),
(48, 6.00, 299, '18 x 0.5L', 32, 1),
(49, 3.50, 156, '6 x 0.5L', 32, 1),
(50, 5.50, 150, '40g', 33, 1),
(51, 640.00, 50, 'Black Frame', 34, 1),
(52, 1000.00, 35, 'Gray Frame', 35, 1),
(53, 1000.00, 40, 'White Frame', 35, 1),
(54, 135.00, 25, '1m hoes', 36, 1),
(55, 150.00, 0, '1.5m hoes', 36, 0),
(56, 550.00, 25, '40L', 37, 1),
(57, 460.00, 19, '30L', 37, 1),
(58, 150.00, 110, '40Kg (Total weight)', 38, 1),
(59, 20.00, 0, 'Black', 39, 0),
(60, 250.00, 25, 'Standard', 40, 1),
(61, 300.00, 0, 'Extended', 40, 0),
(62, 450.00, 10, 'Standard', 41, 1),
(63, 4.99, 80, 'Small', 42, 1),
(64, 7.99, 150, 'Big', 42, 1),
(65, 15.00, 75, '3 hanging toys', 43, 1),
(66, 19.99, 399, 'Female voice', 44, 1),
(67, 19.99, 500, 'Male voice', 44, 1),
(68, 8.00, 999, 'Black', 45, 1),
(69, 15.00, 333, 'Sort of Pink', 46, 1),
(70, 13.00, 248, 'Waterproof', 47, 1),
(71, 18.00, 139, 'Full Effect', 48, 1),
(72, 30.00, 0, '30ML', 49, 0),
(73, 25.00, 160, 'Black', 50, 1),
(74, 25.00, 160, 'White', 50, 1),
(75, 65.00, 190, 'Size 42', 51, 1),
(76, 65.00, 190, 'Size 40', 51, 1),
(77, 65.00, 130, 'Size 38', 51, 1),
(78, 65.00, 180, 'Size 36', 51, 1),
(79, 65.00, 150, 'Size 34', 51, 1),
(80, 35.00, 210, '35cm', 52, 1),
(81, 35.00, 0, '40cm', 52, 0),
(82, 25.00, 199, 'Light Green', 53, 1),
(83, 40.00, 50, 'English', 54, 1),
(84, 40.00, 50, 'Malay', 54, 1),
(85, 45.00, 40, 'English', 55, 1),
(86, 45.00, 60, 'Malay', 55, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE IF NOT EXISTS `shopping_cart` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `in_cart` tinyint(1) DEFAULT '1',
  `variation_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `user_id` (`user_id`),
  KEY `variation_id` (`variation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `email`, `phone`, `first_name`, `last_name`, `is_active`) VALUES
(1, 'abdalghany', 'ohitsme2', 'abdalghany@windowslive.com', '011119151798', 'Abdlghany', 'Dada', 1),
(3, 'bbbbbb', 'ccccc', 'aaaaa@bbb.ccc', '159532167', 'aaaaa', 'bbbbb', 1),
(4, 'userNumberEleven', 'numbertwelve please2', 'number11@gmail.com', '0111789653', 'Number', 'Eleven', 1),
(5, 'amal', '12345', 'amal@gmail.com', '2733563623', 'amal', 'akram', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_addresses`
--

DROP TABLE IF EXISTS `users_addresses`;
CREATE TABLE IF NOT EXISTS `users_addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `zip_code` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_addresses`
--

INSERT INTO `users_addresses` (`address_id`, `user_id`, `street`, `city`, `state`, `country`, `zip_code`, `label`) VALUES
(1, 1, '38B, Jalan Boleh has a Temper', 'Petaling Jaya', 'Selangor', 'Malaysia', '40150', 'Work'),
(7, 1, '385-Blok 14', 'Shah Alam', 'Selangor', 'Malaysia', '40100', 'Home'),
(9, 4, '5-9-3L, Lower half street', 'Shah Alam', 'Selangor', 'Malaysia', '50201', 'Work'),
(10, 4, '895632', 'Muar', 'Johor', 'Malaysia', '80450', 'Moms House'),
(11, 1, '7-8-6E, Pakala Papito Street', 'Sandakan', 'Sabah', 'Malaysia', '89000', 'Dads House');

-- --------------------------------------------------------

--
-- Table structure for table `users_security`
--

DROP TABLE IF EXISTS `users_security`;
CREATE TABLE IF NOT EXISTS `users_security` (
  `security_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `question` varchar(50) NOT NULL,
  `answer` varchar(50) NOT NULL,
  PRIMARY KEY (`security_id`),
  KEY `users.user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
