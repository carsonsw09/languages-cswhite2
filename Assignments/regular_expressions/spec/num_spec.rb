# spec/num_spec.rb

RSpec.describe 'Regular Expression for integer literals' do
    let(:nonzero_decimal_digit) { /[1-9]/ }
    let(:decimal_digit) { /[0-9]/ }
    let(:octal_digit) { /[0-7]/ }
    let(:hex_digit) { /[0-9a-fA-F]/ }
    let(:binary_digit) { /[0-1]/ }
  
    let(:decimal) { /#{nonzero_decimal_digit}('?#{decimal_digit}*)*/ }
    let(:octal) { /0('?[0-7])*/ }
    let(:hex) { /0[xX]#{hex_digit}('?[#{hex_digit}]+)*/ }
    let(:binary) { /0[bB]('?#{binary_digit}+)*/ }
    let(:size_suffix) { /[uUlLzZ]*/ }
  
    let(:pattern) { /^(#{decimal}|#{octal}|#{hex}|#{binary})#{size_suffix}$/ }
  
    let(:should_pass) do
      [
        "123", "052", "0x2a", "0b1010", 
        "123u", "052ul", "0x2aLL", "0b1010Z"
      ]
    end
    let(:should_fail) { ["'123'", "0b1234", "0xZZZ", "03A"] }
  
    describe 'should pass' do
      it 'matches all expected strings' do
        should_pass.each do |str|
          expect(str).to match(pattern)
        end
      end
    end
  
    describe 'should fail' do
      it 'does not match any of the strings' do
        should_fail.each do |str|
          expect(str).not_to match(pattern)
        end
      end
    end
  end
  