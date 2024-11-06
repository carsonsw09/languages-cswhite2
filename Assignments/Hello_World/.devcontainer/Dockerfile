FROM mcr.microsoft.com/devcontainers/cpp:1-debian-11

# Uncomment and replace `<your-port-name-here>` to install vcpkg ports if needed.
# RUN su vscode -c "${VCPKG_ROOT}/vcpkg install <your-port-name-here>"

# Uncomment and replace `<your-package-list-here>` to install additional packages if needed.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# Install g++ for C++ compilation
RUN apt-get update && apt-get install -y g++