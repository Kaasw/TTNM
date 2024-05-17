import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Footer from "./components/shared/Footer";
import NavigationBar from "./components/shared/NavigationBar";


const LoginScreen = lazy(() => import("./screen/LoginScreen"));
const SignUpScreen = lazy(() => import("./screen/SignUpScreen"));
const MyToast = lazy(() => import("./components/shared/MyToast"));


function App() {
	useEffect(() => {
		document.title = "ADHD";
	}, []);

	return (
		<Router>
			<Layout>
				<NavigationBar />
				{/* <MyToast /> */}
				<Switch>
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