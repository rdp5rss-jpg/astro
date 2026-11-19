import 'package:flutter_test/flutter_test.dart';
import 'package:bhavishyaa/main.dart';

void main() {
  testWidgets('Bhavishyaa App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const BhavishyaaApp());
    expect(find.text('BHAVISHYAA'), findsWidgets);
  });
}
