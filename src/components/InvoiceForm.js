import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import InvoiceGrid from './InvoiceGrid';

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        qty: '',
        price: '',
        discountPercentage: '',
        discountAmount: '',
        taxPercentage: '',
        taxAmount: '',
        totalPrice: '',
      });
      const [invoices, setInvoices] = useState([]);
      
      const { qty, price, discountAmount, discountPercentage, taxAmount, taxPercentage, totalPrice } = formData;
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        // update form data
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    
        // update dependent fields
        if (name === 'discountPercentage') {
          const discountAmount = parseFloat(formData.price) * (parseFloat(value) / 100);
          setFormData((prevFormData) => ({
            ...prevFormData,
            discountAmount: discountAmount.toFixed(2),
          }));
        } else if (name === 'discountAmount') {
          const discountPercentage = (parseFloat(value) / parseFloat(formData.price)) * 100;
          setFormData((prevFormData) => ({
            ...prevFormData,
            discountPercentage: discountPercentage.toFixed(2),
          }));
        } else if (name === 'taxPercentage') {
          const taxAmount = parseFloat(formData.price) * (parseFloat(value) / 100);
          setFormData((prevFormData) => ({
            ...prevFormData,
            taxAmount: taxAmount.toFixed(2),
          }));
        } else if (name === 'taxAmount') {
          const taxPercentage = (parseFloat(value) / parseFloat(formData.price)) * 100;
          setFormData((prevFormData) => ({
            ...prevFormData,
            taxPercentage: taxPercentage.toFixed(2),
          }));
        }
      };

      useEffect(() => {
        if(qty && price && discountAmount && taxAmount){
            let totalPrice = (qty * price) - discountAmount + taxAmount;
            setFormData((prevFormData) => ({
                ...prevFormData,
                totalPrice: totalPrice
            }))
        }
      }, [taxAmount, qty, price, discountAmount]);
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // create new invoice object
        const newInvoice = {
          qty: formData.qty,
          price: formData.price,
          discountPercentage: formData.discountPercentage,
          discountAmount: formData.discountAmount,
          taxPercentage: formData.taxPercentage,
          taxAmount: formData.taxAmount,
        //   totalPrice: totalPrice.toFixed(2),
          totalPrice: formData.totalPrice,
        };
    
        // add new invoice to invoices array
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    
        // clear form data
        setFormData({
          qty: '',
          price: '',
          discountPercentage: '',
          discountAmount: '',
          taxPercentage: '',
          taxAmount: '',
          totalPrice: '',
        });
      };
    return(
        <div className="container">
            {/** Form */}
            <div className="form-container">
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    {/* Invoice Form */}
                    <Grid item xs={12} md={10} lg={10}>
                        <Paper className="mui-paper">
                            <Typography variant="h6" gutterBottom>
                            Add Invoice
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="qty"
                                        name="qty"
                                        label="Qty"
                                        fullWidth
                                        autoComplete="given-name"
                                        type="number"
                                        value={qty}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="price"
                                        name="price"
                                        label="Price"
                                        fullWidth
                                        autoComplete="family-name"
                                        type="number"
                                        value={price}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="discountPercentage"
                                        name="discountPercentage"
                                        label="Discount %"
                                        fullWidth
                                        type="number"
                                        value={discountPercentage}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="discountAmount"
                                        name="discountAmount"
                                        label="Discount"
                                        fullWidth
                                        type="number"
                                        value={discountAmount}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="taxPercentage"
                                        name="taxPercentage"
                                        label="Tax %"
                                        fullWidth
                                        type="number"
                                        value={taxPercentage}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="taxAmount"
                                        name="taxAmount"
                                        label="Tax"
                                        fullWidth
                                        type="number"
                                        value={taxAmount}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="totalPrice"
                                        name="totalPrice"
                                        label="Total Price"
                                        fullWidth
                                        type="number"
                                        value={totalPrice}
                                        onChange={handleInputChange}
                                    />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom: "0.5rem"}}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Add Invoice
                                    </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            {/** Table */}
            <div className="invoice-table">
                <Typography variant='h5' align='left'>Invoices({invoices.length})</Typography>
                <InvoiceGrid invoices={invoices}/>
            </div>
        </div>
    )
};

export default InvoiceForm;