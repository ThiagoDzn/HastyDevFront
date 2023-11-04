import styled from "styled-components";
import { useState } from "react";
import { FormFetch } from "../../axios/config";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonPrimaryLong } from "../Buttons/Buttons";

interface ContactFormTypes {
  Name: string;
  Email: string;
  Phone: string;
  Category: string;
  Subject: string;
  Message: string;
}

const ContactForm = () => {
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Category: "",
    Subject: "",
    Message: "",
  });

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function isValidEmail(Email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(Email);
  }

  function isValidPhoneNumber(Phone: string) {
    const numericPhoneNumber = Phone.replace(/\D/g, "");
    if (numericPhoneNumber.length > 10) {
      return true;
    } else {
      return false;
    }
  }

  const validateForm = () => {
    const { Name, Email, Phone, Category, Subject, Message } = values;
    if (Name === "") {
      toast.error("Nome é Obrigatório!", toastOptions);
      return false;
    } else if (Name.length <= 3) {
      toast.error("Nome Precisa ter mais de 3 Caracteres", toastOptions);
      return false;
    } else if (Email === "") {
      toast.error("E-mail é obrigatório!", toastOptions);
      return false;
    } else if (!isValidEmail(Email)) {
      toast.error("E-mail não é válido!", toastOptions);
      return false;
    } else if (Phone === "") {
      toast.error("Telefone é obrigatório!", toastOptions);
      return false;
    } else if (!isValidPhoneNumber(Phone)) {
      toast.error("Telefone não é válido!", toastOptions);
      return false;
    } else if (Category === "") {
      toast.error("Categoria é obrigatória!", toastOptions);
      return false;
    } else if (Subject === "") {
      toast.error("Assunto é obrigatório!", toastOptions);
      return false;
    } else if (Message === "") {
      toast.error("Mensagem é obrigatória!", toastOptions);
      return false;
    } else if (Message.length < 10) {
      toast.error(
        "A mensagem deve ter pelo menos 10 caracteres!",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleContactForm = async ({
    Name,
    Email,
    Phone,
    Category,
    Subject,
    Message,
  }: ContactFormTypes) => {
    try {
      if (validateForm()) {
        const response = await FormFetch.post("/contactForm", {
          Name,
          Email,
          Phone,
          Category,
          Subject,
          Message,
        });
        console.log(response.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={() => handleContactForm(values)}>
          <input
            type="text"
            placeholder="Nome"
            name="Name"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="email"
            placeholder="E-mail"
            name="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="tel"
            placeholder="Telefone"
            name="Phone"
            onChange={(e) => handleChange(e)}
          />
          <select
            title="Category"
            id="Category"
            name="Category"
            onChange={(e) => handleChange(e)}
          >
            <option value="Comercial">Comercial</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Suporte">Suporte</option>
            <option value="Outro">Outro</option>
          </select>

          <input
            type="text"
            placeholder="Assunto"
            name="Subject"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            name="Message"
            id="Message"
            cols={30}
            rows={10}
            placeholder="Digite sua Mensagem..."
          ></textarea>
         <ButtonPrimaryLong type="submit" buttonText="Entre em Contato" />
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default ContactForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
  }

  input,
  select {
    border: none;
    border-bottom: 1px solid #000;
    display: flex;
    width: 500px;
    height: 58px;
    padding-top: 24px;
    gap: 10px;

    &::placeholder {
      color: #5d5f61;
    }

    &:focus {
      outline: none;
      border-bottom-color: #000;
    }
  }

  textarea {
    padding: 10px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`;