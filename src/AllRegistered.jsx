import { Refresh } from "@mui/icons-material";
import {
	Alert,
	Table,
	TableCell,
	TableBody,
	TableHead,
	TableRow,
	Paper,
	Box,
	Backdrop,
	CircularProgress,
	Card,
	Button,
	Grid,
	Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {Base64} from "js-base64";
import secret_props from "./properties/secret-properties.json";

const AllRegisteredStudents = (props) => {
	let [data, setData] = useState(null);
	let [isLoading, setLoading] = useState(false);
	let [showError, setShowError] = useState(false);
    let exporterRef = useRef();

	const handleUnknownError = () => {
		console.log("An unknown error occured");
		setShowError(true);
	};

	const getData = () => {
		setLoading(true);

		fetch(`${secret_props.server_url}/all-registered`)
			.then((response) => {
				if (response.ok) return response.json();
				else handleUnknownError();
			})
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((reason) => {
				console.log(reason);
				setLoading(false);
				setShowError(true);
			});
	};

	useEffect(getData, []);

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10} md={9}>
				<Box
					component={Paper}
					elevation={6}
					sx={{ padding: 2, margin: 2 }}
				>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						{showError ? (
							<Alert severity="error">An error occured</Alert>
						) : null}
					</Box>
					<Typography variant="h3" textAlign="center">
						All Registered Students
					</Typography>

					<Grid
						container
						justifyContent="right"
						spacing={4}
						sx={{ padding: 1 }}
					>
						<Grid item sm="auto">
							<Button
								size="small"
								onClick={getData}
								variant="contained"
								startIcon={<Refresh />}
							>
								Refresh
							</Button>
						</Grid>
					</Grid>

					<Table>
						<TableHead >
							<TableRow  >
								<TableCell sx={{fontSize : "18px"}}>Matric No</TableCell>
								<TableCell sx={{fontSize : "18px"}}>Full name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.map((e) => {
								return (
									<TableRow key={e.matricno}>
										<TableCell>{e.matricno}</TableCell>
										<TableCell>{e.fullName}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
                    <Button variant="contained" sx={{
                        margin: 2
                    }} onClick={()=>{
                        let csv = convertDataToCsv(data);
                        let base64 = Base64.encode(csv, true);

                        exporterRef.current.href = "data:text/csv;base64,"+ base64;
                        exporterRef.current.download = "cs-students.csv";
                        exporterRef.current.click();

                    }}>Export to CSV</Button>
                    <a ref={exporterRef} style={{display: "none"}} href="http://">Export</a>
					<Backdrop open={isLoading}>
						<CircularProgress />
					</Backdrop>
				</Box>
			</Grid>
		</Grid>
	);
};

const convertDataToCsv = data => {
    let cumulatedCsv = "Matric number, Full name \n";

    for(let entry of data){
        let currentString = ` ${entry.matricno},"${entry.fullName}" \n`;
        cumulatedCsv = cumulatedCsv.concat(currentString);
    }

    return cumulatedCsv;
}
//fetch all and display
export default AllRegisteredStudents;
