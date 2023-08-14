export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

export const validatePassword = (password: string) => {
    return password.length >= 8;
};

export const createRouterInstance = (
    router: any,
    controller: any,
    service: any,
    serviceDependencies,
) => {
    return new router(new controller(new service(...serviceDependencies)));
};
