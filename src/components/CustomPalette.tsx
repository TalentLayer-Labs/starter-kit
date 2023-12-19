import Head from 'next/head';
import { useContext } from 'react';
import BuilderPlaceContext from '../modules/BuilderPlace/context/BuilderPlaceContext';

function CustomPalette() {
  const { builderPlace, isBuilderPlaceOwner } = useContext(BuilderPlaceContext);

  /*
    Optim idea:
      - pass all color in rgb mode.
      - Create a loop to create automatically all classes
      - for text, we need to have both ex: text-on-primary & text-primary
    Custom Palette:
        "Palette": {
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
            --primary: ${builderPlace?.palette?.primary || '#FF71A2'};
            --primary-50: ${(builderPlace?.palette?.primary || '#FF71A2') + '60'};
            --primary-focus: ${builderPlace?.palette?.primaryFocus || '#FFC2D1'};
            --primary-content: ${builderPlace?.palette?.primaryContent || '#ffffff'};

            --base-100: ${builderPlace?.palette?.base100 || '#ffffff'};
            --base-200: ${builderPlace?.palette?.base200 || '#fefcfa'};
            --base-300: ${builderPlace?.palette?.base300 || '#fae4ce'};
            --base-content: ${builderPlace?.palette?.baseContent || '#000000'};
            --base-content-50: ${(builderPlace?.palette?.baseContent || '#000000') + '90'};

            --info: ${builderPlace?.palette?.info || '#f4dabe'};
            --info-content: ${builderPlace?.palette?.infoContent || '#000000'};

            --success: ${builderPlace?.palette?.success || '#C5F1A4'};
            --success-50: ${(builderPlace?.palette?.success || '#C5F1A4') + '60'};
            --success-content: ${builderPlace?.palette?.successContent || '#000000'};

            --warning: ${builderPlace?.palette?.warning || '#FFE768'};
            --warning-content: ${builderPlace?.palette?.warningContent || '#000000'};

            --error: ${builderPlace?.palette?.error || '#FFC2D1'};
            --error-content: ${builderPlace?.palette?.errorContent || '#000000'};
          }

          body .bg-primary {
            background-color: var(--primary);
          }

          body .bg-primary-focus {
            background-color: var(--primary-focus);
          }

          body .bg-primary-50 {
            background-color: var(--primary-50);
          }

          body .text-primary {
            color: var(--primary-content);
          }

          body .text-primary-focus {
            color: var(--primary-focus);
          }

          body .border-primary {
            border-color: var(--primary);
          }

          body .border-primary-focus {
            border-color: var(--primary-focus);
          }

          body .bg-base-100 {
            background-color: var(--base-100);
          }

          body .bg-base-200, body .hover\\:bg-base-200:hover {
            background-color: var(--base-200);
          }

          body .bg-base-300 {
            background-color: var(--base-300);
          }

          body .border-base-100 {
            border-color: var(--base-100);
          }

          body .border-base-200 {
            border-color: var(--base-200);
          }

          body .border-base-300 {
            border-color: var(--base-300);
          }

          body .text-base-content {
            color: var(--base-content);
          }

          body .text-base-content-50 {
            color: var(--base-content-50);
          }

          body .bg-info {
            background-color: var(--info);
          }

          body .text-info {
            color: var(--info-content);
          }

          body .border-info {
            border-color: var(--info);
          }

          body .bg-success {
            background-color: var(--success);
          }

          body .bg-success-50 {
            background-color: var(--success-50);
          }

          body .text-success {
            color: var(--success-content);
          }

          body .text-alone-success {
            color: var(--success);
          }

          body .border-success {
            border-color: var(--success);
          }

          body .bg-warning {
            background-color: var(--warning);
          }

          body .text-warning {
            color: var(--warning-content);
          }

          body .border-warning {
            border-color: var(--warning);
          }

          body .bg-error {
            background-color: var(--error);
          }

          body .text-error {
            color: var(--error-content);
          }

          body .text-alone-error {
            color: var(--error);
          }

          body .border-error {
            border-color: var(--error);
          }
        `}
      </style>
    </Head>
  );
}

export default CustomPalette;
