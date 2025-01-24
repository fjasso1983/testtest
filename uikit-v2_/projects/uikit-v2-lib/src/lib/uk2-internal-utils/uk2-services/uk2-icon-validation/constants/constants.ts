export const uk2IconValidationConstants = {
  materialIconErrorMessages: {
    unableToFindIconWithName: 'Unable to find icon with the name',
  },
  errorMessages: {
    notDefinedInIconsRegistryService: 'svgIconName provided is not defined in Uk2IconRegistryService.',
    unhandledException: 'An error ocurred when trying to fetch the icon name',
    fileNotFound: (iconName: string, iconsUrl: string) =>
      `The file ${iconName}.svg was not found. Make sure it is added under ${iconsUrl}.`,
  },
};
