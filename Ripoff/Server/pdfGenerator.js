import PDFDocument from 'pdfkit';
import fs from 'fs';


class createNewReceipt{
    constructor(orderId, date, customerEmail, products, variations, prices, quantities, totalPrice){
        this.orderId = orderId;
        this.date = date;
        this.customerEmail = customerEmail;
        this.products = products;
        this.variations = variations;
        this.prices = prices;
        this.quantities = quantities;
        this.totalPrice = totalPrice;
    }
    newReceipt(callback) {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream('../Client/orderReceipts/Order' + this.orderId + ".pdf");
        doc.pipe(writeStream);
        const hr = "---------------------------------------";
        doc.image('./img/ripoffLogo.png',170,0, {
            fit: [75, 75]
        })
        .fontSize(30)
        .text("RipOff", 250, 30);
    
        // Order Information
        doc.font('fonts/OpenSans-Light.ttf')
            .fontSize(20)
            .text('Receipt for your order (No' + this.orderId + ')', 25, 75)
            .fontSize(15)
            .text('Dated: ' + this.date, 50, 110)
            .text('Customer Email: ' + this.customerEmail, 50, 130)
            .text(hr+hr,50,150);
    
        let y = 180; // Initial y-coordinate for product details
    
        // Loop through products and variations
        this.products.forEach((product, index) => {
            if (y >= 650) { // Check if the y-coordinate is reaching the bottom of the page
                doc.addPage(); // Add a new page, because the old page is full
                y = 75; // Resetting y-coordinate for the new page
            }
            const price = this.prices[index];
            doc.fontSize(15)
                .text('Product: ' + product, 50, y)
                .text('Variation: ' + this.variations[index], 50, y + 25)
                .text('Price: RM' + price, 50, y + 50)
                .text('Quantity: ' + this.quantities[index], 50, y + 75)
                .text(hr,50,y+100);;
    
            y += 125; // Move y-coordinate down for the next product
        });
    
        // Total Price
        if (y >= 650) { // Check if there's space for total price on the same page
            doc.addPage();
            y = 75;
        }
        doc.fontSize(15)
            .text('Total Price: RM' + parseFloat(this.totalPrice), 50, y + 25)
            .text(hr, 50, y+50)
            .text('Hope you enjoy your purchase!', 50, y+75);
    
        doc.end();
        // Add an event listener to check if the file has finished being written to the hard drive before callback() is run
        // to make sure the PDF is fully created before sending it via Email in the next step...
        writeStream.on('finish', function() {
            //console.log('PDF creation finished for order: ' + this.orderId);
            callback();
        }.bind(this));
    }  
}
export default createNewReceipt;
//createNewReceipt(3, '31/08/2024', 'abdalghany@windowslive.com', ['Lenovo All in One ThinkCentre', 'JBL Wave 200TWS True', 'Surrounded by Idiots :'], ['Black', 'Black', 'Malay'], [3600, 180, 40], [1, 9, 2], 5300);
