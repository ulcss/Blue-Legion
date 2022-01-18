import {
	Button,
	Grid,
	Stack,
	Box,
	TextField,
	Paper,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import logo from "./blue-legion2.svg";

const RegistrationPage = (props) => {
	let showLogo = useMediaQuery("(min-width : 640px)");
	let nameRef = useRef();
	let matricRef = useRef();

	const handleClick = () => {
		let controller = new RegistrationController();
		controller.setDetails({
			fullName: nameRef.current.value,
			matricno: matricRef.current.value,
		});

		controller
			.tryRegister()
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Box
			sx={{
				display: "flex",
				mt: 3,
				justifyContent: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: "20px",
					width: {
						xs: 11 / 12,
						md: 8 / 12,
					},
				}}
			>
				<Grid container spacing="6">
					<Grid item xs="12" sm="7">
						<Stack spacing={2} maxWidth="sm">
							<Typography
								variant="h6"
								sx={{ textAlign: "center" }}
							>
								Register for Computer Science Attendance
							</Typography>

							<TextField
								inputRef={matricRef}
								required
								variant="outlined"
								label="Matric no"
								type="text"
								helperText="Matric or JAMB Reg no"
							/>
							<TextField
								inputRef={nameRef}
								variant="outlined"
								required
								label="Full name"
								type="text"
								helperText="[Surname], [First name] [Other names]"
							/>
							<Button color="primary" variant="contained" onClick={handleClick}>
								Submit
							</Button>
						</Stack>
					</Grid>
					<Grid
						item
						xs="12"
						sm="5"
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Stack
							spacing={1}
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							{showLogo ? (
								<img
									alt="logo"
									src={logo}
									width="90"
									height="90"
									style={{ display: "inline-block" }}
								/>
							) : null}
							<Typography
								variant="h6"
								sx={{ color: "#331eb3", textAlign: "center" }}
							>
								{!showLogo ? "Powered by " : null}
								<strong>Blue</strong> Legion
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

class RegistrationController {
	constructor() {
		this.details = {};
	}

	setDetails(details) {
		this.details = details;
	}

	async tryRegister() {
		return fetch("url", {
			method: "POST",
			headers: {
				"Content-Type": "text/json",
			},
			body: JSON.stringify(this.details),
		});
	}
}

export default RegistrationPage;
