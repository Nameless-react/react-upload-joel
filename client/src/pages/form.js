import React, { useEffect, useState } from "react"
import { Formik, Form as form, Field, ErrorMessage } from "formik"
import { usePosts } from "../context/postContext"
import * as yup from "yup";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Form() {    
    const { createPost, getPost, updatePost } = usePosts();
    const url = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: null
    });

    useEffect(() => {
        const getInfo = async () => {
            if(params.id && url.pathname !== "/postform") {
                const data = await getPost(params.id);
                setPost({
                    title: data.title,
                    description: data.description,
                });
            }
        }

        getInfo();
    }, [])

    const handleSubmit = async (values, action) => {
        if(params.id) {
            await updatePost({ _id: params.id, ...values });
        } else {
            await createPost(values)
        }
        action.setSubmitting(false);
        navigate("/");
    }

    return (
        <div className="form"> 
            <Formik 
                initialValues={post}
                enableReinitialize
                validationSchema={yup.object({
                    title: yup.string().required("Title is required"),
                    description: yup.string().required("Description is required"),
                })}
                onSubmit={(values, action) => handleSubmit(values, action)}
            >
                {({ handleSubmit, setFieldValue, isSubmitting }) => (
                      <form onSubmit={handleSubmit} className="form-1">
                        <h3>{url.pathname === "/postform" ? "New Post" : "Edit Post"}</h3>
                        <div className="input">
                            <Field name="title" placeholder="Title" />   
                            <ErrorMessage component="p" className="errors"  name="title"/>
                        </div>
                        <div className="textarea">
                            <Field as="textarea" name="description" placeholder="Description" />
                            <ErrorMessage component="p" className="errors" name="description"/>
                        </div>
                        <input type="file" name="image" className="file" onChange={(e) => setFieldValue("image", e.target.files[0])} />
                        <button type="submit" disabled={isSubmitting}>{url.pathname === "/postform" ? isSubmitting ? <AiOutlineLoading3Quarters className="spinner"/> : "Create" : isSubmitting ? <AiOutlineLoading3Quarters className="spinner"/> : "Edit"}</button>   
                    </form>
                )}
            </Formik>
        </div>
    )
}