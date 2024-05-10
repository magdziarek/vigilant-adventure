import "./App.css";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
//TODO: we should use this TB lib for validation
// import { isEmail, isPhoneNumber } from "@lib/validation";

function App() {
  const fields = [
    {
      label: "Name",
      key: "name",
      alternateMatches: ["first name", "first"],
      fieldType: {
        type: "input",
      },
      example: "Stephanie",
      validations: [
        {
          rule: "required",
          errorMessage: "Name is required",
          level: "error",
        },
      ],
    },
    {
      label: "Gender",
      key: "gender",
      alternateMatches: ["sexAssignedAtBirth"],
      fieldType: {
        type: "input",
      },
      example: "other",
    },
    {
      label: "subjectId",
      key: "subjectId",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "email",
      key: "email",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "phoneNumber",
      key: "phoneNumber",
      fieldType: {
        type: "input",
      },
    },
  ];
  return (
    <>
      <ReactSpreadsheetImport
        isOpen={() => {}}
        onClose={() => {}}
        onSubmit={(data) => {
          console.log(data);
        }}
        fields={fields}
        rowHook={(data, addError) => {
          const { phoneNumber, email, subjectId, gender } = data;

          if (!phoneNumber && !email && !subjectId) {
            addError("subjectId", {
              message:
                "You have to provide either subjectId or email address or phone number for every candidate",
              level: "error",
            });
            addError("email", {
              message:
                "You have to provide either subjectId or email address or phone number for every candidate",
              level: "error",
            });
            addError("phoneNumber", {
              message:
                "You have to provide either subjectId or email address or phone number for every candidate",
              level: "error",
            });
          }

          if (!["Male", "Female", "Other", "Unknown"].includes(gender)) {
            addError("gender", {
              message: "Gender has to be: Female, Male, Other or Unknown",
              level: "error",
            });
          }

          // if (!isEmail(email)) {
          //   addError("email", {
          //     message: "This is not a valid email address",
          //     level: "error",
          //   });
          // }

          // if (!isPhoneNumber(phoneNumber)) {
          //   addError("phoneNumber", {
          //     message: "This is not a valid phone number",
          //     level: "error",
          //   });
          // }

          return {
            ...data,
          };
        }}
      />
    </>
  );
}

export default App;
