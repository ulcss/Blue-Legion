import {
	Button,
	Grid,
	Stack,
	Box,
	TextField,
	Paper,
	Typography,
	useMediaQuery,
	Alert,
	CircularProgress,
} from "@mui/material";
import { useRef, useState } from "react";
import logo from "./blue-legion2.svg";
import secret_props from "./properties/secret-properties.json";

const RegistrationPage = (props) => {
	let showLogo = useMediaQuery("(min-width : 640px)");
	let [notification, setNotificationMsg] = useState(null);
	let [loading, setLoading] = useState(false);
	let nameRef = useRef();
	let matricRef = useRef();

	console.log("hello")

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
				updateUser(data);
				setLoading(false);
			})
			.catch((error) => console.log(error));

		setLoading(true);
		setNotificationMsg(null);
	};

	const updateUser = (data) => {
		if (data.status === "SUCCESS") {
			setNotificationMsg(<Alert severity="success">{data.msg}</Alert>);
		} else if (data.status === "FAILED") {
			setNotificationMsg(<Alert severity="error">{data.msg}</Alert>);
		}
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
					<Grid item xs={12} sm={7}>
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
							<Button
								color="primary"
								variant="contained"
								onClick={handleClick}
							>
								Submit
							</Button>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<CircularProgressWrapper loading={loading} />
							</Box>

							{notification}
						</Stack>
					</Grid>
					<Grid
						item
						xs={12}
						sm={5}
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
								alignItems: "center",
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
								variant={showLogo ? "h4" : "body2"}
								sx={{ color: "#3343b3", textAlign: "center" }}
							>
								{!showLogo ? "Powered by " : null}
								<strong>Blue Legion</strong>
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

const CircularProgressWrapper = (props) => {
	if (props.loading) {
		return <CircularProgress {...props} />;
	} else return <Box />;
};

class RegistrationController {
	constructor() {
		this.details = {};
	}

	setDetails(details) {
		this.details = details;
	}

	async tryRegister() {
		return fetch(secret_props.registration_url, {
			method: "POST",
			headers: {
				"Content-Type": "text/json",
			},
			body: JSON.stringify(this.details),
		});
	}
}

export default RegistrationPage;
