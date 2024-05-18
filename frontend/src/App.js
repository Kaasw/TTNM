import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Footer from "./components/shared/Footer";
import NavigationBar from "./components/shared/NavigationBar";

const ReadSCreen = lazy(() => import("./screen/ReadScreen"));
const HomeScreen = lazy(() => import("./screen/HomeScreen"));
const LoginScreen = lazy(() => import("./screen/LoginScreen"));
const SignUpScreen = lazy(() => import("./screen/SignUpScreen"));
const MyToast = lazy(() => import("./components/shared/MyToast"));


function App() {
	useEffect(() => {
		document.title = "ReadEasy";
	}, []);

	const isLoggedIn = localStorage.getItem("token");

	return (
		<Router>
			<Layout>
				<NavigationBar />
				<MyToast />
				<Switch>

     		<Route exact path="/">
            			{isLoggedIn ? (
          	   	 			<Suspense
								  fallback={
									  <div className="flex h-screen">
										  <div className="font-mono font-bold text-3xl m-auto">
											  Loading...
										  </div>
									  </div>
								  }
							  >
								<HomeScreen />
							  </Suspense>) : (
              				<Redirect to="/login" /> 
            )}
          	</Route>


					<Route path="/login">
						<Suspense
							fallback={
								<div className="flex h-screen">
									<div className="font-mono font-bold text-3xl m-auto">
										Loading...
									</div>
								</div>
							}
						>
							<LoginScreen />
						</Suspense>
					</Route>

					<Route path="/read">
						<Suspense
							fallback={
								<div className="flex h-screen">
									<div className="font-mono font-bold text-3xl m-auto">
										Loading...
									</div>
								</div>
							}
						>
							<ReadSCreen />
						</Suspense>
					</Route>

          <Route path="/signup">
						<Suspense
							fallback={
								<div className="flex h-screen">
									<div className="font-mono font-bold text-3xl m-auto">
										Loading...
									</div>
								</div>
							}
						>
							<SignUpScreen />
						</Suspense>
					</Route>

				</Switch>
				<Footer />
			</Layout>
		</Router>
	);
}

export default App;