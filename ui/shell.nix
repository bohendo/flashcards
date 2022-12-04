{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      node2nix
      nodejs-16_x
      nodePackages.typescript
    ];
}
