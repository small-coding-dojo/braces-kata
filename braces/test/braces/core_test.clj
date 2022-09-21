(ns braces.core-test
  (:require [clojure.test :refer :all]
            [braces.core :refer :all]))

(deftest accept-empty-string
  (testing "Accept empty string"
    (is (balanced? "" "()"))))

(deftest dont-accept-single-open-parentheses
  (testing "Don't accept single open parentheses"
    (is (not (balanced? "(" "()")))))

;; (deftest accept-open-and-closing-parens
;;  (testing "accept-open-and-closing-parens"
;;    (is (balanced? "()" "()"))))
