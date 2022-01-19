import { Route, BrowserRouter as Router } from "react-router-dom";
import { Routes } from "react-router";
import AllRegisteredStudents from "./AllRegistered";
import RegistrationPage from "./Registration";
import { Box } from "@mui/material";

const MainRouter = (props) => {
	return (
		<Box>
			<Router>
				<Routes>
					<Route path="/all-registered" element={<AllRegisteredStudents/>}>
						
					</Route>
					<Route exact path="/" element={<RegistrationPage />}>
						
					</Route>
				</Routes>
			</Router>
		</Box>
	);
};

export default MainRouter;
