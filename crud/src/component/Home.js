import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { deluser, edtUser, loadUser, edtUserUpdate } from '../redux/action';

// material ui custom style 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Home = () => {
    let dispatchs = useDispatch();
    const { user } = useSelector((state) => state.data)
    console.log("user", user)

    useEffect(() => {
        dispatchs(loadUser())
    }, [])

    const handelDelete =(id)=> {
        
        if(window.confirm("Are you sure to delete user? please see value in console and localStorage")){
            dispatchs(deluser(id));
        }
    }
    const [editData, setEditData] = useState(user.data)
const [isEdit, setIsEdit]= useState(false);
const [userDetail, setUserDetail] = useState({
    
    first_name:"",
    last_name:"",
    email:"",
    avatar: ""
})

const saveHandler =(id, avatar)=>{
    console.log("userdetail", userDetail,)
    dispatchs(edtUserUpdate({id, ...userDetail, avatar}))
    setIsEdit(false)
    setUserDetail({
    
        first_name:"",
        last_name:"",
        email:"",
        avatar: ""
    })
}

const handaleUserDetailChange =(evt)=> {
    const value = evt.target.value;
    setUserDetail({
    ...userDetail,
    [evt.target.name]: value
  });
}
const [curreItem, setCurreItem] = useState(0)
    const handelEdit =(obj)=> {
        if(window.confirm("Are you sure to Edit user? ")){
            // dispatchs(edtUser(obj));
            setIsEdit(true);
            setCurreItem(obj.id)
        }
    }

    // console.log("user", user.data)

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>First Name</StyledTableCell>
                            <StyledTableCell align="center">Last Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Avtar</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user && user.data && user.data.map((value, index) => {
                            return (

                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                 {   isEdit && curreItem === value.id  ? <input type="text" name="first_name" placeholder='First Name' value={userDetail.first_name} onChange={handaleUserDetailChange}/> : <p> {value.first_name}</p>}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                    {   isEdit && curreItem === value.id  ? <input type="text" name="last_name" placeholder='Last Name' value={userDetail.last_name} onChange={handaleUserDetailChange}/> : <p>  {value.last_name}</p>}
                                       
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                    {   isEdit && curreItem === value.id  ? <input type="text" name="email" placeholder='Email' value={userDetail.email} onChange={handaleUserDetailChange}/> : <p> {value.email}</p>}
                                        
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img style={{ width: "50px" }} src={value.avatar} alt="Image" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">

                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button color="secondary" style={{marginRight:"5px"}}  onClick={()=> handelDelete(value.id)}>Delet</Button>
                                            {
                                                 isEdit && curreItem === value.id ? <Button color="primary" onClick={()=>saveHandler(value.id, value.avatar)}>Save</Button> :<Button color="primary" onClick={()=> handelEdit(value)}>Edit</Button>
                                            }
                                            
                                           
                                        </ButtonGroup>

                                    </StyledTableCell>

                                </StyledTableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}

export default Home
