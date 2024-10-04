import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const Formm = ({
  formcontrol,
  onsubmit,
  formdata,
  setformdata,
  buttontext,
  isbtndisabled,
}) => {
  function rendercomponentsbytype(getcontrolitem) {
    let element = null;
    const value = formdata[getcontrolitem.name] || "";
    switch (getcontrolitem.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.name}
            type={getcontrolitem.type}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolitem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setformdata({
                ...formdata,
                [getcontrolitem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolitem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolitem.options && getcontrolitem.options.length > 0
                ? getcontrolitem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.id}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolitem.name]: event.target.value,
              })
            }
          />
        );

        break;
      default:
        element = (
          <Input
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.name}
            type={getcontrolitem.type}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolitem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onsubmit}>
      <div className="flex flex-col gap-3">
        {formcontrol.map((controlitem) => (
          <div className="grid w-full gap-1.5" key={controlitem.name}>
            <Label className="mb-1">{controlitem.label}</Label>
            {rendercomponentsbytype(controlitem)}
          </div>
        ))}
      </div>

      <Button disabled={isbtndisabled} type="submit" className="mt-2 w-full">
        {buttontext || "Submit"}
      </Button>
    </form>
  );
};

export default Formm;
