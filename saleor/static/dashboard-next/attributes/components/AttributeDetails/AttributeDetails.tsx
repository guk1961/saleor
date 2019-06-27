import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import SingleSelectField from "@saleor/components/SingleSelectField";
import i18n from "@saleor/i18n";
import { FormErrors } from "@saleor/types";
import { AttributeInputTypeEnum } from "@saleor/types/globalTypes";
import { AttributePageFormData } from "../AttributePage";

export interface AttributeDetailsProps {
  data: AttributePageFormData;
  disabled: boolean;
  errors: FormErrors<"name" | "slug" | "inputType">;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const inputTypeChoices = [
  {
    label: i18n.t("Dropdown"),
    value: AttributeInputTypeEnum.DROPDOWN
  },
  {
    label: i18n.t("Multiple Select"),
    value: AttributeInputTypeEnum.MULTISELECT
  }
];

const AttributeDetails: React.FC<AttributeDetailsProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => (
  <Card>
    <CardTitle title={i18n.t("General Information")} />
    <CardContent>
      <TextField
        disabled={disabled}
        error={!!errors.name}
        label={i18n.t("Default Label")}
        name={"name" as keyof AttributePageFormData}
        fullWidth
        helperText={errors.name}
        value={data.name}
        onChange={onChange}
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!errors.slug}
        label={i18n.t("Attribute Code")}
        name={"slug" as keyof AttributePageFormData}
        fullWidth
        helperText={
          errors.slug ||
          i18n.t("This is used internally. Make sure you don’t use spaces", {
            context: "slug input"
          })
        }
        value={data.slug}
        onChange={onChange}
      />
      <FormSpacer />
      <SingleSelectField
        choices={inputTypeChoices}
        disabled={disabled}
        error={!!errors.inputType}
        hint={errors.inputType}
        label={i18n.t("Catalog Input type for Store Owner", {
          context: "attribute input type"
        })}
        name="inputType"
        onChange={onChange}
        value={data.inputType}
      />
    </CardContent>
  </Card>
);
AttributeDetails.displayName = "AttributeDetails";
export default AttributeDetails;