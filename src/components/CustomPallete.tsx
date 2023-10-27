import Head from 'next/head';
import { IBuilderPlace } from '../modules/BuilderPlace/types';

function CustomPallete({ builderPlace }: { builderPlace: IBuilderPlace }) {
  /*
    Custom Pallete:
        "pallete": {
            "primary": "#FF71A2",
            "primaryFocus": "#FFC2D1",
            "primaryContent": "#ffffff",
            "base100": "#ffffff",
            "base200": "#fefcfa",
            "base300": "#fae4ce",
            "baseContent": "#000000",
            "info": "#f4dabe",
            "infoContent": "#000000",
            "success": "#C5F1A4",
            "successContent": "#000000",
            "warning": "#FFE768",
            "warningContent": "#000000",
            "error": "#FFC2D1",
            "errorContent": "#000000",
            "_id": "653b6e82d0c68fbc2750dfc9"
        },
    */
  return (
    <Head>
      <style>
        {`
          :root {
            --primary: ${builderPlace?.pallete?.primary || '#FF71A2'};
            --primary-focus: ${builderPlace?.pallete?.primaryFocus || '#FFC2D1'};
            --primary-content: ${builderPlace?.pallete?.primaryContent || '#ffffff'};

            --base-100: ${builderPlace?.pallete?.base100 || '#ffffff'};
            --base-200: ${builderPlace?.pallete?.base200 || '#fefcfa'};
            --base-300: ${builderPlace?.pallete?.base300 || '#fae4ce'};
            --base-content: ${builderPlace?.pallete?.baseContent || '#000000'};

            --info: ${builderPlace?.pallete?.info || '#f4dabe'};
            --info-content: ${builderPlace?.pallete?.infoContent || '#000000'};

            --success: ${builderPlace?.pallete?.success || '#C5F1A4'};
            --success-content: ${builderPlace?.pallete?.successContent || '#000000'};

            --warning: ${builderPlace?.pallete?.warning || '#FFE768'};
            --warning-content: ${builderPlace?.pallete?.warningContent || '#000000'};

            --error: ${builderPlace?.pallete?.error || '#FFC2D1'};
            --error-content: ${builderPlace?.pallete?.errorContent || '#000000'};
          }

          .bg-primary {
            background-color: var(--primary);
          }

          .text-primary {
            color: var(--primary-content);
          }

          .text-primary-focus {
            color: var(--primary-focus);
          }

          .border-primary {
            border-color: var(--primary);
          }

          .bg-base-100 {
            background-color: var(--base-100);
          }

          .bg-base-200 {
            background-color: var(--base-200);
          }

          .bg-base-300 {
            background-color: var(--base-300);
          }

          .border-base-100 {
            border-color: var(--base-100);
          }

          .border-base-200 {
            border-color: var(--base-200);
          }

          .border-base-300 {
            border-color: var(--base-300);
          }

          .text-base-content-content {
            color: var(--base-content);
          }

          .bg-info {
            background-color: var(--info);
          }

          .text-info {
            color: var(--info-content);
          }

          .border-info {
            border-color: var(--info);
          }

          .bg-success {
            background-color: var(--success);
          }

          .text-success {
            color: var(--success-content);
          }

          .border-success {
            border-color: var(--success);
          }

          .bg-warning {
            background-color: var(--warning);
          }

          .text-warning {
            color: var(--warning-content);
          }

          .border-warning {
            border-color: var(--warning);
          }

          .bg-error {
            background-color: var(--error);
          }

          .text-error {
            color: var(--error-content);
          }

          .border-error {
            border-color: var(--error);
          }
        `}
      </style>
    </Head>
  );
}

export default CustomPallete;
