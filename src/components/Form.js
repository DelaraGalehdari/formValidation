import React, { useState, useEffect } from "react";
import "../styles/form.css";

const Form = () => {
  const [questionStep, setQuestionStep] = useState(0);
  const [issubmit, setIsSubmit] = useState(false);
  const [indexArray, setIndexArray] = useState();
  const [formValues, setFromValues] = useState({
    firstName: "",
    lastName: "",
    isPreferName: "",
    preferName: "",
    age: "",
  });

  const [formError, setFormError] = useState({});

  //array of questions
  const questions = [
    {
      id: 0,
      question: "What is your first name ?",
      type: "text",
      name: "firstName",
    },
    { id: 1, question: "What is your age?", type: "number", name: "age" },
    {
      id: 2,
      question: "Do you have a significant other?",
      type: "dropdown",
      name: "isPreferName",
    },
    {
      id: 3,
      question: "What is your significant other’s name?",
      type: "text",
      name: "preferName",
    },
    {
      id: 4,
      question: "What is your last name?",
      type: "text",
      name: "lastName",
    },
  ];

  //form validation
  const handleChange = (event) => {
    const { name, value } = event.target;
    let errors = formError;
    const namePattern = /^[a-zA-Z ]/;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 3 || !namePattern.test(value)
            ? "Name must be at least 3 characters long!"
            : "";
        break;
      case "age":
        errors.age =
          value < 18 || value >= 65 ? "Age must be between 18-65!" : "";
        break;
      case "isPreferName":
        errors.isPreferName = value === "" ? "The element can not be null" : "";

        break;
      case "lastName":
        errors.lastName =
          value.length < 3 || !namePattern.test(value)
            ? "LastName must be at least 3 characters long!"
            : "";
        break;
      case "preferName":
        errors.preferName =
          value.length < 3 || !namePattern.test(value)
            ? "Name must be at least 3 characters long!"
            : "";
        break;

      default:
        break;
    }
    setFormError(errors);
    setFromValues({ [name]: value });
  };

  // checking the conditions after clicking the button
  const renderButton = () => {
    if (questionStep > 4) {
      return undefined;
    } else if (
      questionStep === questions.length - 1 &&
      formError[indexArray] === ""
    ) {
      return (
        <button className="glow-on-hover" onClick={() => setIsSubmit(true)}>
          Done
        </button>
      );
    } else if (questionStep < 4 && formError[indexArray] === "") {
      return (
        <button
          className="glow-on-hover"
          onClick={() =>
            formValues[indexArray] === "false"
              ? setQuestionStep(questionStep + 2)
              : setQuestionStep(questionStep + 1)
          }
        >
          Next
        </button>
      );
    }
  };

  //finding index of selected input
  useEffect(() => {
    let inx = questions.find((item) => item.id === questionStep);
    setIndexArray(inx.name);
  }, [questionStep, questions]);

  return (
    <div className="container">
      {issubmit === false ? (
        <div className="header-title">
          <h1>Welcome to the Assessment</h1>
          <p>Become a new member in 5 easy steps</p>

          {questions.map((element) => (
            <div className="card-container" key={element.id}>
              {element.id === questionStep && (
                <div>
                  <p className="question-style">{element.question}</p>
                  {element.type === "text" && (
                    <div>
                      <input
                        type={element.type}
                        name={element.name}
                        onChange={handleChange}
                        className="text-input"
                      />
                      {formError[indexArray] !== "" && (
                        <span className="error">{formError[indexArray]}</span>
                      )}
                    </div>
                  )}
                  {element.type === "number" && (
                    <div>
                      <input name="age" type="number" onChange={handleChange} />
                      {formError[indexArray] !== "" && (
                        <span className="error">{formError[indexArray]}</span>
                      )}
                    </div>
                  )}
                  {element.type === "dropdown" && (
                    <div>
                      <select
                        name="isPreferName"
                        defaultValue="true"
                        onChange={handleChange}
                        type="boolean"
                      >
                        <option value="true" disabled>
                          Choose an option
                        </option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                      <p>{formError.isPreferName}</p>
                    </div>
                  )}

                  <div>{renderButton()}</div>
                </div>
              )}
            </div>
          ))}
          {issubmit && <p>Your user registration was successful</p>}
        </div>
      ) : (
        <div className="header-title">
          <h5>Mr / Mrs {formValues.lastName}</h5>
          <p>Thanks For Your Submission</p>
        </div>
      )}
    </div>
  );
};

export default Form;
