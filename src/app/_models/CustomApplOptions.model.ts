import {IDocFormat} from "./DocFormat.model";
import {find} from "lodash";

export class CustomApplOption {
  public request_examination_early_bool: boolean = false
  public doc_format: IDocFormat | null = null

  constructor(init?: Partial<CustomApplOption>) {
    Object.assign(this, init)
  }
}

export class CustomApplOptionsSubmit {
  public request_examination_early_bool: boolean = false
  public doc_format: number | null = null

  constructor(init?: Partial<CustomApplOption>) {
    Object.assign(this, init)
  }
}

export function convertToCustomApplOptionsSubmit(cApplOptions: CustomApplOption): CustomApplOptionsSubmit {
  let cApplOptionsSubmit = new CustomApplOptionsSubmit()
  cApplOptionsSubmit = {
    ...cApplOptions,
    'doc_format': cApplOptions.doc_format?.id || null,
  }
  return cApplOptionsSubmit // cApplDetailsSubmit
}

export function convertToCustomApplOptions(cApplOptionsSubmit: CustomApplOptionsSubmit,
                                           doc_formats: IDocFormat[],
): CustomApplOption {
  let cApplOptions = new CustomApplOption()
  cApplOptions = {
    ...cApplOptionsSubmit,
    'doc_format': find(doc_formats, x => x.id == cApplOptionsSubmit.doc_format) || null,
  }
  return cApplOptions
}
