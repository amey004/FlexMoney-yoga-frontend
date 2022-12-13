import { Container, Paper, TextField,Grid,Typography, Select, Button} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';


export const MyForm = () => {

  /*Declaring state variables*/
  const [name,setname] = useState('');
  const [phone,setphone] = useState('');
  const [email,setemail] = useState('');
  const [age,setage] = useState(Number);
  const [batch,setbatch] = useState('');
  const [month,setmonth] = useState('');
  const [error,seterror] = useState('');
  const [showPayment,setshowPayment] = useState(false);
  const [cardNumber,setcardnumber] = useState('');
  const [cardname,setcardname] = useState('');
  const [cvv,setcvv] = useState('');

  /*Range for age */
  const options = [];
  for (let i = 18; i <=65; i++) {
    options.push(i);
  }

  /* Options for batch */
  const options2 = ["6-7 AM", "7-8 AM", "8-9 AM", "5-6 PM"];

  /*Get current month*/
  const date = new Date();
  const months = date.toLocaleString('defualt',{month:'long'});

  /*Send values to server after submiting*/
  const handleSubmit = e => {
    e.preventDefault();
    validate([name, email, phone, age, batch, month]);
    console.log(name,email,phone,age,batch,month);
    setshowPayment(true);
  }

  /*Send value to database and verify result*/
  const handleSubmitpayment = async e => {
    e.preventDefault();
    axios.post("http://localhost:3001/register",{name,email,phone,age,batch,month}).then((res)=>{
      console.log(res.status);
      alert("Registration Successful!");
      window.location.reload(true);
    }).catch((e)=>{
      alert("Registration not sucessful. Try Again!");
      window.location.reload(true);
    })
  }

  /*Validation*/
  const validate = (values) => {
    seterror('')

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[1])) {
      seterror("email");
      return;
    }

    if(values[2].length!==10){
      seterror('phone');
      return;
    }

  } 

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>

      {/*Form*/}
      <Paper style={{ padding: "50px" }}>
        <h1>FlexMoney Yoga Admission Form</h1>
        {(!showPayment || error!=='' ) && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} style={{ marginTop: "30px" }}>
              {/*Name */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Enter Name</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => setname(e.target.value)}
                  variant="outlined"
                  value={name}
                  required
                ></TextField>
              </Grid>

              {/*Email */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Enter email</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => setemail(e.target.value)}
                  variant="outlined"
                  value={email}
                  required
                  error={error === "email"}
                  helperText={error === "email" ? "Invalid Email Address" : ""}
                ></TextField>
              </Grid>

              {/*Age */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Enter age</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={(e) => setage(e.target.value)}
                  variant="outlined"
                  value={age}
                  style={{ width: "100%" }}
                  required
                >
                  {options.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Select>
              </Grid>

              {/*Phone Number */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Enter Phone No.</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(e) => setphone(e.target.value)}
                  variant="outlined"
                  value={phone}
                  required
                  error={error === "phone"}
                  helperText={error === "phone" ? "Invalid Phone Number" : ""}
                ></TextField>
              </Grid>

              {/*Batch */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Select Batch</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={(e) => setbatch(e.target.value)}
                  variant="outlined"
                  value={batch}
                  style={{ width: "100%" }}
                  required
                >
                  {options2.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </Select>
              </Grid>

              {/*Month */}
              <Grid item xs={6}>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h6">Select Month</Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={(e) => setmonth(e.target.value)}
                  variant="outlined"
                  value={month}
                  required
                  style={{ width: "100%" }}
                >
                  <option value={months}>{months}</option>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              Proceed
            </Button>
          </form>
        )}
        {showPayment && error!=='phone' && error!=='email' && (
          <div>
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmitpayment}>
              <Grid container spacing={2} style={{ marginTop: "30px" }}>
                {/*Name on card*/}
                <Grid item xs={6}>
                  <div style={{ padding: "10px" }}>
                    <Typography variant="h6">Enter Name</Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setcardname(e.target.value)}
                    variant="outlined"
                    value={cardname}
                    required
                  ></TextField>
                </Grid>

                {/*Card Number*/}
                <Grid item xs={6}>
                  <div style={{ padding: "10px" }}>
                    <Typography variant="h6">Enter Card Number</Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setcardnumber(e.target.value)}
                    variant="outlined"
                    value={cardNumber}
                    required
                  ></TextField>
                </Grid>

                {/*CVV*/}
                <Grid item xs={6}>
                  <div style={{ padding: "10px" }}>
                    <Typography variant="h6">Enter CVV</Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setcvv(e.target.value)}
                    variant="outlined"
                    value={cvv}
                    required
                  ></TextField>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "15px" }}
              >
                Submit
              </Button>
            </form>
          </div>
        )}
      </Paper>
    </Container>
  );
}
