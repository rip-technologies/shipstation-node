export interface PaperlessDownload {
  /**
   * A URL

   * @example "http://api.shipstation.com/v2/labels/se-28529731"
   */
  href: string;
  /**
   * The instructions for the paperless download.
   *
   * @default null
   * @example "Please handoff to the recipient"
   */
  instructions: string | null;
  /**
   * The handoff code for the paperless download.
   *
   * @default null
   * @example "122334"
   */
  handoff_code: string | null;
}
