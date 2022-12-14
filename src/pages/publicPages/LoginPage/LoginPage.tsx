import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { fetchUsersData } from "../../../api/PMService";
import { setAuth } from "../../../store/Slices/authSlice";
import { selectUser, setCurrentUser } from "../../../store/Slices/userSlice";
import { useAppDispatch } from "../../../store/store";
import st from "../LandingPage/LandingPage.module.scss";

const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const { usersData } = useSelector(selectUser);
    const [showMessage, setShowMessage] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string().email().required("Email required"),
            password: Yup.string().min(4).max(20).required("Password required"),
        }),

        onSubmit: (values) => {
            const matchUser = usersData.find(
                (i) =>
                    i.email === values.email && i.password === values.password
            );

            if (matchUser) {
                setShowMessage(false);
                localStorage.setItem(
                    "authData",
                    JSON.stringify({
                        id: matchUser.id,
                        email: matchUser.email,
                        password: matchUser.password,
                    })
                );
                dispatch(setCurrentUser(matchUser));
                dispatch(
                    setAuth({
                        id: matchUser.id,
                        email: matchUser.email,
                        password: matchUser.password,
                    })
                );
            } else {
                setShowMessage(true);
            }
        },
    });

    useEffect(() => {
        if (usersData.length === 0) {
            dispatch(fetchUsersData());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={st.form}>
            <form onSubmit={formik.handleSubmit}>
                <h2>Log In</h2>
                <input
                    id="email"
                    type="email"
                    placeholder="enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                <input
                    id="password"
                    type="password"
                    placeholder="enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}

                <button type="submit">Log In</button>

                {showMessage && <h3>wrong data</h3>}
            </form>
            <Link to="/">Back</Link>
        </div>
    );
};

export default LoginPage;
