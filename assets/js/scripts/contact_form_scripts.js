export default function contactFormScripts() {
  const contactForms = document.querySelectorAll(".contact-form");

  contactForms?.forEach((form) => {
    const fileInput = form.querySelector('input[name="file"]');
    const dropArea = form.querySelector(".input-file-area");
    const fileSelect = form.querySelector(".empty-area button");
    const fileCancel = form.querySelector(".uploaded-area__remove");
    const fileName = form.querySelector(".uploaded-area__file");
    // const fileSize = form.querySelector(".uploaded-area");
    // const fileInfo = form.querySelector(".inputFile-info");

    const validateFile = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const validTypes = ["application/pdf", "image/jpeg", "image/jpg"];
        const byteSize = 1048576;
        const maxSizeInBytes = 5 * byteSize;

        fileName.textContent = file.name;
        // fileSize.textContent = (file.size / byteSize).toFixed(2) + " MB";

        dropArea.classList.add("input-file-area--uploaded");

        // if (!validTypes.includes(file.type)) {
        //   fileInfo.innerHTML = "<span>Plik musi być w formacie PDF</span>";
        //   fileInput.value = "";
        // }

        // if (file.size > maxSizeInBytes) {
        //   fileInfo.innerHTML += "<span>Rozmiar pliku za duży</span>";
        //   fileInput.value = "";
        // }

        // fileInfo.textContent = "";
      } else {
        dropArea.classList.remove("input-file-area--uploaded");
      }
    };

    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();

      fileInput.files = e.dataTransfer.files;
      fileInput.files.length > 0 && validateFile(fileInput.files[0]);
    });

    fileSelect.addEventListener("click", () => {
      fileInput.click();
    });
    fileCancel.addEventListener("click", () => {
      fileInput.value = "";
      fileInput.dispatchEvent(new Event("change"));
    });

    fileInput.addEventListener("change", validateFile);

    const cfPopup = document.querySelector(".cf-popup");
    const closePopupBtns = cfPopup?.querySelectorAll(".close-cf-popup");
    const popupTitle = cfPopup?.querySelector(".cf-popup__title");
    const popupText = cfPopup?.querySelector(".cf-popup__text");

    closePopupBtns?.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        cfPopup.classList.remove("cf-popup--open");
      });
    });

    const submitButton = form.querySelector('button[type="submit"]');
    const submitButtonDefaultText = submitButton.innerText;
    function startSending() {
      submitButton.disabled = true;
      submitButton.innerText = "Wysyłanie...";
    }

    function stopSending() {
      submitButton.disabled = false;
      submitButton.innerText = submitButtonDefaultText;
    }

    function validateEmail(email) {
      const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return reg.test(String(email).toLowerCase());
    }
    function validatePhoneNumber(phone) {
      const reg = /^\+?[0-9]{9,15}$/;
      return reg.test(String(phone));
    }

    function clearErrorMessages(form) {
      const errorInputs = form.querySelectorAll(".isError");
      errorInputs.forEach((input) => {
        input.classList.remove("isError");
      });
    }

    function showErrorMessage(field, message) {
      const inputContainer = field.closest(".contact-form-field");
      inputContainer.classList.add("isError");
      if (message) {
        const errorElement = inputContainer.querySelector(
          ".contact-form-field__msg"
        );
        if (errorElement) {
          errorElement.innerText = message;
        }
      }
    }

    function validateFileInput(fileInput) {
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg"];
      const maxSizeInBytes = 25 * 1048576;
      const file = fileInput.files[0];

      if (!file) {
        return false;
      }

      if (!validTypes.includes(file.type)) {
        return "Obsługiwane są jedynie pliki PDF lub JPEG";
      }

      if (file.size > maxSizeInBytes) {
        return "Rozmiar pliku nie może przekraczać 25 MB";
      }

      return null;
    }

    function validateForm(formInputs, data) {
      let errors = [];

      if (!data.fullname || data.fullname.trim() === "") {
        errors.push({
          field: formInputs.fullname,
          message: "To pole jest wymagane",
        });
      }

      if (!data.email && !data.phone) {
        errors.push({
          field: formInputs.email,
          message: "To pole jest wymagane",
        });
        errors.push({
          field: formInputs.phone,
          message: "To pole jest wymagane",
        });
      } else {
        if (data.email && !validateEmail(data.email)) {
          errors.push({
            field: formInputs.email,
            message: "Nieprawidłowy adres email",
          });
        }
        if (data.phone && !validatePhoneNumber(data.phone)) {
          errors.push({
            field: formInputs.phone,
            message: "Nieprawidłowy numer",
          });
        }
      }

      // if (!data.content || data.content.trim() === "") {
      //   errors.push({
      //     field: formInputs.content,
      //     message: false,
      //   });
      // }

      if (!data.approval) {
        errors.push({
          field: formInputs.approval,
          message: "Musisz wyrazić zgodę na przetwarzanie danych osobowych",
        });
      }

      const fileError = validateFileInput(formInputs.fileInput);
      if (fileError) {
        errors.push({
          field: formInputs.fileInput,
          message: fileError,
        });
      }

      return errors;
    }

    function showAlertMessage(isSended, message) {
      if(isSended){
        popupTitle.innerHTML = 'Formularz został przesłany!';
      } else{
        popupTitle.innerHTML = 'Nie udało się przesłać formularza';
      }
      popupText.innerHTML = message;
      cfPopup.classList.add("cf-popup--open");
    }

    function sendMail(event) {
      event.preventDefault();

      clearErrorMessages(form);

      const formInputs = {
        fullname: form.querySelector('input[name="fullname"]'),
        company: form.querySelector('input[name="company"]'),
        email: form.querySelector('input[name="email"]'),
        phone: form.querySelector('input[name="phone"]'),
        content: form.querySelector('textarea[name="content"]'),
        approval: form.querySelector('input[name="approval"]'),
        fileInput: form.querySelector('input[name="file"]'),
      };

      const data = {
        fullname: formInputs.fullname.value,
        company: formInputs.company.value,
        email: formInputs.email.value,
        phone: formInputs.phone.value,
        content: formInputs.content.value,
        approval: formInputs.approval.checked,
        fileInput: formInputs.fileInput,
      };

      const validationErrors = validateForm(formInputs, data);

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          showErrorMessage(error.field, error.message);
        });
        return;
      }

      startSending();

      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("company", data.company);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("content", data.content);
      formData.append("approval", data.approval);

      if (data.fileInput.files.length > 0) {
        formData.append("file", data.fileInput.files[0]);
      }

      const url = "http://127.0.0.1:5500/lib/send_mail.php";

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          showAlertMessage(true, data.text);
          stopSending();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          showAlertMessage(
            false,
            "Spróbuj ponownie za chwilę lub <br> skontaktuj się z nami w inny sposób"
          );
          stopSending();
        });
    }

    form.onsubmit = sendMail;
  });
}
