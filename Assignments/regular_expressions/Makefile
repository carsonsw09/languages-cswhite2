# Makefile

Gemfile.setup : Gemfile
	bundle install
	type nul > Gemfile.setup

setup : Gemfile.setup

test : setup
	rspec
