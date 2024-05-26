export const paths = {
  LOGIN: "/login",
  HOME: "/",
  EXPERTS: "/experts",
  APPOINTMENTS: "/appointments",
  PRICES: "/prices",
  PERMISSION_DENIED: "/permission-denied",
  SERVICES: "/services",
  SCHEDULE: "/schedule",
  SPECIALIZATIONS: "/specializations",
};

export const publicRoutes = [paths.LOGIN, paths.PERMISSION_DENIED];
export const privateRoutes = [
  paths.EXPERTS,
  paths.PRICES,
  paths.SERVICES,
  paths.APPOINTMENTS,
  paths.SCHEDULE,
  paths.SPECIALIZATIONS,
];
